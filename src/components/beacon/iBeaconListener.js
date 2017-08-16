import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';


// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
const region = {
    identifier: 'Estimotes',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
};


class IBeaconListener {

    init(beaconsDidRangeCb, regionDidEnterCb, regionDidExitCb) {
        // Request for authorization while the app is open

        if(Platform.OS  === 'ios') {

            //ranging
            Beacons.requestWhenInUseAuthorization();
            Beacons.startRangingBeaconsInRegion(region);

            //monitoring
            //Beacons.requestAlwaysAuthorization();
            //Beacons.startUpdatingLocation();
            //Beacons
            //    .startMonitoringForRegion(region);
        }



        if(Platform.OS  === 'android') {
            Beacons.startRangingBeaconsInRegion(region.identifier, region.uuid);

           // Beacons.startMonitoringForRegion(region.identifier, region.uuid);
        }

        //Beacons
        //    .startUpdatingLocation();

        //DeviceEventEmitter.addListener(
        //    'regionDidEnter',
        //    regionDidEnterCb
        //);

        //DeviceEventEmitter.addListener(
        //    'regionDidExit',
        //    regionDidExitCb
        //);


        // Listen for beacon changes
        DeviceEventEmitter.addListener(
            'beaconsDidRange',
            beaconsDidRangeCb
        );

    }

    close() {
        Beacons.stopMonitoringForRegion();
        Beacons.stopRangingBeaconsInRegion();
        //Beacons.stopUpdatingLocation();
        //DeviceEventEmitter.removeListener('regionDidEnter');
        //DeviceEventEmitter.removeListener('regionDidExit');
        DeviceEventEmitter.removeListener('beaconsDidRange');
    }


}

export default IBeaconListener;