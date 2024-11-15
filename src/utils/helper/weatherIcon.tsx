import Icon from "../../components/icons/Icon";
import weatherCode from "../../constants/weatherCode";

export const handleIconWeather = (code: number, width?: string, height?: string) => {
    let temp = weatherCode.filter((item) => {
      return item[0] === code;
    });
    switch (temp[0][3]) {
      case "FaSnowflake":
        return (
          <Icon src="/imageIcon/Rain cloud.png" width={width} height={height} />
        );
      case "FaSun":
        return <Icon src="/imageIcon/sun.png" width={width} height={height} />;

      case "FaCloudRain":
        return (
          <Icon src="/imageIcon/Rain cloud.png" width={width} height={height} />
        );
      case "FaCloud":
        return (
          <Icon src="/imageIcon/cloud.png" width={width} height={height} />
        );
      case "FaWind":
        return (
          <Icon src="/imageIcon/storm.png" width={width} height={height} />
        );
      default:
        break;
    }
  };