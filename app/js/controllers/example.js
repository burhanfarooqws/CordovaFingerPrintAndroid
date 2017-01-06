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
            angular.isDefined(Fingerprint); //unfortunately if the plugin is not installed calling this will cause fatal error
            vm.deviceInfo = $cordovaDevice.getDevice();
            var uuid = $cordovaDevice.getUUID();
            var platform = $cordovaDevice.getPlatform();

            alert(angular.isDefined(Fingerprint));
            if (platform == "iOS") {
                Fingerprint.isAvailable().then(function () {
                    // success, fingerprint supported
                    alert('Finger Print Supported. :' + platform);
                }, function (error) {
                    alert(error); // not supported
                });
            }

            if (platform == "Android") {

                Fingerprint.isAvailable(function () {
                    // success, fingerprint supported
                    alert('Finger Print Supported. :' + platform);
                }, function (error) {
                    alert(error); // not supported
                });

                var options = {
                    clientId: "Fingerprint App",
                    clientSecret: "secret" //Only necessary for Android
                };
                Fingerprint.show(options, function () {
                    // success
                    alert('Finger Print Supported. :' + platform);
                }, function (error) {
                    alert(error); // not supported
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
