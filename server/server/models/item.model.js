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
    metaTitle: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the metaTitle'
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
    year: {
      type: Sequelize.INTEGER,
      allowNull: {
        args: true,
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
      type: Sequelize.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter the date of the creation'
      }
    },
    objectTypeSlug: {
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
    districtSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the address'
      }
    },
    districtLabel: {
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
    appTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    appTypeSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    appViewLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    appViewSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
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
    houseTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    houseTypeSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    houseViewLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    houseViewSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    houseWallLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    houseWallSlug: {
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
      type: Sequelize.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter the room area value',
      }
    },
    roomViewSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    roomViewLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    garageTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    garageTypeSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    garageTypeLabelShort: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    garageSubTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    garageSubTypeSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    garageSubTypeLabelShort: {
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
    sectorTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    sectorTypeSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    sectorTypeLabelShort: {
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
        args: true,
      }
    },
    commercialTypeLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    commercialArea: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the commercial area value',
      }
    },
    commercialClass: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    commercialTenant: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
    commercialFacade: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      }
    },
  }, {});

  return Item;
};