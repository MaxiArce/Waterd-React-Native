class Plant {
    constructor(refId, name, iconId, isExteriorPlant,wateringDays,wateringTimeStamp) {
      this.refId = refId.toString();
      this.name = name;
      this.iconId = iconId;
      this.isExteriorPlant = isExteriorPlant.toString();
      this.wateringDays = wateringDays;
      this.wateringTimeStamp = wateringTimeStamp;
    }
  }
  
  export default Plant;

