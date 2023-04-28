import { Platform } from "react-native";

// a hook that creates a url that directs to the default navigation app with the desired navigation point
export default function useLocationUrl(lat:number, lng:number, label:string):string {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    //@ts-ignore
    return url;
}
