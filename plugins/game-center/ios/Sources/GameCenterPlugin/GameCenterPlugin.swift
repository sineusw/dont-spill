import Foundation
import Capacitor
import GameKit

@objc(GameCenterPlugin)
public class GameCenterPlugin: CAPPlugin, CAPBridgedPlugin, GKGameCenterControllerDelegate {
    public let identifier = "GameCenterPlugin"
    public let jsName = "GameCenter"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "signIn", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "submitScore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showLeaderboard", returnType: CAPPluginReturnPromise)
    ]
    private var signInCall: CAPPluginCall?

    @objc func signIn(_ call: CAPPluginCall) {
        let player = GKLocalPlayer.local
        if player.isAuthenticated { call.resolve(["authenticated": true, "name": player.displayName]); return }
        signInCall = call
        DispatchQueue.main.async {
            player.authenticateHandler = { [weak self] vc, error in
                guard let self = self else { return }
                if let vc = vc {
                    self.bridge?.viewController?.present(vc, animated: true)
                    return
                }
                if let c = self.signInCall {
                    self.signInCall = nil
                    c.resolve(["authenticated": player.isAuthenticated, "name": player.isAuthenticated ? player.displayName : "", "error": error?.localizedDescription ?? ""])
                }
            }
        }
    }

    @objc func submitScore(_ call: CAPPluginCall) {
        guard let id = call.getString("leaderboardId"), let score = call.getInt("score") else { call.reject("leaderboardId and score required"); return }
        guard GKLocalPlayer.local.isAuthenticated else { call.reject("not signed in"); return }
        GKLeaderboard.submitScore(score, context: 0, player: GKLocalPlayer.local, leaderboardIDs: [id]) { error in
            if let error = error { call.reject(error.localizedDescription) } else { call.resolve() }
        }
    }

    @objc func showLeaderboard(_ call: CAPPluginCall) {
        let id = call.getString("leaderboardId")
        DispatchQueue.main.async {
            let vc: GKGameCenterViewController
            if let id = id { vc = GKGameCenterViewController(leaderboardID: id, playerScope: .global, timeScope: .allTime) }
            else { vc = GKGameCenterViewController(state: .leaderboards) }
            vc.gameCenterDelegate = self
            self.bridge?.viewController?.present(vc, animated: true)
            call.resolve()
        }
    }

    public func gameCenterViewControllerDidFinish(_ gameCenterViewController: GKGameCenterViewController) {
        gameCenterViewController.dismiss(animated: true)
    }
}
