'use strict';
module.exports = (sequelize, Sequelize) => {

  const Item = sequelize.define('item', {
    title: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the title'
      }
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the company name'
      }
    },
    companyRoleLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the company role label'
      }
    },
    companyRoleSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the company role slug'
      }
    },
    cardName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the card name'
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the status'
      }
    },
    createdDate: {
      type: Sequelize.DECIMAL,
      allowNull: {
        args: false,
        msg: 'Please enter the date of the creation'
      }
    },
    objectType: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the object type'
      }
    },
    objectTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the object type label'
      }
    },
    objectTypeLabelShort: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the object type label short',
      }
    },
    deal: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the deal type'
      }
    },
    addressCoords: {
      type: Sequelize.ARRAY(Sequelize.FLOAT),
      allowNull: {
        args: false,
        msg: 'Please enter the address coords'
      }
    },
    addressName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the address name'
      }
    },
    district: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the address'
      }
    },
    onlineShow: {
      type: Sequelize.BOOLEAN,
      allowNull: {
        args: false,
        msg: 'Please enter the onlineShow value'
      }
    },
    photoGallery: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: {
        args: true,
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter the description value'
      }
    },
    price: {
      type: Sequelize.BIGINT,
      allowNull: {
        args: false,
        msg: 'Please enter the price value'
      }
    },
    tarif: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the tarif value'
      }
    },
    deposit: {
      type: Sequelize.BIGINT,
      allowNull: {
        args: false,
        msg: 'Please enter the deposit value'
      }
    },
    rentType: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the rentType value'
      }
    },
    connectionWay: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the connectionWay value'
      }
    },
    phone: {
      type: Sequelize.BIGINT,
      allowNull: {
        args: false,
        msg: 'Please enter the phone value'
      }
    },
    roomsCountSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    roomsCountLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    floor: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    floorAll: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    comfortType: {
      type: Sequelize.STRING,
      allowNull: {
        args: true
      }
    },
    comfortBedCount: {
      type: Sequelize.STRING,
      allowNull: {
        args: true
      }
    },
    comfortSleepingPlacesCount: {
      type: Sequelize.STRING,
      allowNull: {
        args: true
      }
    },
    comfortRoomMultimedia: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: {
        args: true
      }
    },
    comfortRoomEquipment: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: {
        args: true
      }
    },
    comfortRoom: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: {
        args: true
      }
    },
    comfortRoomAdditional: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: {
        args: true
      }
    },
    appType: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the app type value',
      }
    },
    appView: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the app view value',
      }
    },
    appArea: {
      type: Sequelize.BIGINT,
      allowNull: {
        args: false,
        msg: 'Please enter the app area value',
      }
    },
    appAreaLiving: {
      type: Sequelize.BIGINT,
      allowNull: {
        args: true,
      }
    },
    appAreaKitchen: {
      type: Sequelize.BIGINT,
      allowNull: {
        args: true,
      }
    },
    houseType: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the house type value',
      }
    },
    houseView: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the house view value',
      }
    },
    houseWall: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    houseAreaLand: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the house area land value',
      }
    },
    houseAreaHouse: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the house area value',
      }
    },
    roomArea: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the room area value',
      }
    },
    garageType: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the garage type value',
      }
    },
    garageTypeShort: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    garageSubType: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the garage sub type value',
      }
    },
    garageSubTypeShort: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the garage sub type short value',
      }
    },
    garageArea: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the garage area value',
      }
    },
    garageSecurity: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the garage security value',
      }
    },
    sectorType: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the sector type value',
      }
    },
    sectorTypeShort: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    sectorArea: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the sector area value',
      }
    },
    sectorFacade: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    sectorAvailabilityOfBuildings: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    commercialTypeSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the commercial type value slug',
      }
    },
    commercialTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the commercial type value label',
      }
    },
    commercialArea: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the commercial area value',
      }
    },
    year: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    commercialClass: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    distanceLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    distanceSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    commercialTenant: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the commercial tenant value',
      }
    },
    commercialFacade: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the commercial facade value',
      }
    },
  }, {});

  return Item;
};