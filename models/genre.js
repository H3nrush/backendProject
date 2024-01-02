module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Genre', {
  genreAction:{
    type: DataTypes.STRING , 
    allowNull: true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreHorror:{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreWestern:{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreAdventure:{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreRomantic:{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreMystery:{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreHistorical :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreDrama :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreReality :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreFantasy :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreFamily :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreCriminal :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreScience :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
  genreComedy :{
    type: DataTypes.STRING , 
    allowNull:true,
    unique:{
      msg: "we have this genre !"
    }
  },
});
}