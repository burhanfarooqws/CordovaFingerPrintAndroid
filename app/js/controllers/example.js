function ExampleCtrl(CordovaService, $cordovaDevice) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
    vm.number = 1234;
    vm.deviceReady = false;
    vm.deviceReadyStatus = 'Cordova not loaded';
    vm.deviceInfo = {};

    let loadDeviceInfo = () => {
        vm.deviceReady = true;
        vm.deviceReadyStatus = 'Device Ready';

        try {
            debugger;
            angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
            angular.isDefined(FingerprintAuth); //unfortunately if the plugin is not installed calling this will cause fatal error
            vm.deviceInfo = $cordovaDevice.getDevice();
            var uuid = $cordovaDevice.getUUID();
            var platform = $cordovaDevice.getPlatform();

            alert(angular.isDefined(FingerprintAuth));
            if (platform == "iOS") {
                Fingerprint.isAvailable().then(function () {
                    // success, fingerprint supported
                    alert('Finger Print Supported. :' + platform);
                }, function (error) {
                    alert(error); // not supported
                });
            }

            if (platform == "Android") {

                var client_id = "Your client ID";
                var client_secret = "A very secret client secret (once per device)";
                alert(platform);
                FingerprintAuth.isAvailable(function (result) {
                    alert(result.isAvailable);
                    if (result.isAvailable) {
                        if (result.hasEnrolledFingerprints) {
                            FingerprintAuth.show({
                                clientId: client_id,
                                clientSecret: client_secret
                            }, function (result) {
                                if (result.withFingerprint) {
                                    window.alert("Successfully authenticated using a fingerprint");
                                } else if (result.withPassword) {
                                    window.alert("Authenticated with backup password");
                                }
                            }, function (error) {
                                console.log(error); // "Fingerprint authentication not available"
                                window.alert("Fingerprint authentication not available");
                            });
                        } else {
                            window.alert("Fingerprint auth available, but no fingerprint registered on the device");
                        }
                    }
                    else{
                        alert("Not available.");
                    }
                }, function (message) {
                    window.alert("Cannot detect fingerprint device : " + message);
                });
            }

        }
        catch (e) {
            alert(e);
            vm.deviceReadyStatus += ' - Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
        }
    };

    CordovaService.ready.then(() => loadDeviceInfo());
}

export default {
    name: 'ExampleCtrl',
    fn: ExampleCtrl
};
