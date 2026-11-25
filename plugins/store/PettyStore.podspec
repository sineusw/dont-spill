Pod::Spec.new do |s|
  s.name = 'PettyStore'
  s.version = '1.0.0'
  s.summary = 'Minimal StoreKit 2 plugin for Don\'t Spill'
  s.license = 'MIT'
  s.homepage = 'https://github.com/sineusw/dont-spill'
  s.author = 'Petty Games Studio'
  s.source = { :git => 'https://github.com/sineusw/dont-spill.git', :tag => s.version.to_s }
  s.source_files = 'ios/Sources/**/*.swift'
  s.ios.deployment_target = '15.0'
  s.dependency 'Capacitor'
  s.frameworks = 'StoreKit'
  s.swift_version = '5.5'
end
