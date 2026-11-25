import Foundation
import Capacitor
import StoreKit

@objc(StorePlugin)
public class StorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StorePlugin"
    public let jsName = "PettyStore"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "products", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "owned", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise)
    ]
    private var updates: Task<Void, Never>?

    override public func load() {
        updates = Task.detached {
            for await result in Transaction.updates {
                if case .verified(let t) = result { await t.finish() }
            }
        }
    }

    @objc func products(_ call: CAPPluginCall) {
        let ids = call.getArray("ids", String.self) ?? []
        Task {
            do {
                let ps = try await Product.products(for: ids)
                call.resolve(["products": ps.map { ["id": $0.id, "price": $0.displayPrice, "title": $0.displayName] }])
            } catch { call.reject(error.localizedDescription) }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        guard let id = call.getString("id") else { call.reject("id required"); return }
        Task {
            do {
                guard let p = try await Product.products(for: [id]).first else { call.resolve(["ok": false, "error": "not found"]); return }
                let r = try await p.purchase()
                switch r {
                case .success(let v):
                    if case .verified(let t) = v { await t.finish(); call.resolve(["ok": true, "id": t.productID]) }
                    else { call.resolve(["ok": false, "error": "unverified"]) }
                case .userCancelled: call.resolve(["ok": false, "cancelled": true])
                case .pending: call.resolve(["ok": false, "pending": true])
                @unknown default: call.resolve(["ok": false])
                }
            } catch { call.reject(error.localizedDescription) }
        }
    }

    @objc func owned(_ call: CAPPluginCall) {
        Task {
            var ids: [String] = []
            for await r in Transaction.currentEntitlements { if case .verified(let t) = r { ids.append(t.productID) } }
            call.resolve(["ids": ids])
        }
    }

    @objc func restore(_ call: CAPPluginCall) {
        Task {
            do { try await AppStore.sync() } catch {}
            var ids: [String] = []
            for await r in Transaction.currentEntitlements { if case .verified(let t) = r { ids.append(t.productID) } }
            call.resolve(["ids": ids])
        }
    }
}
