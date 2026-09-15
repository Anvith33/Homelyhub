import slugify from 'slugify';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "please provide property name"]
  },
  description: {
    type: String,
    required: [true, "please provide property description"]
  },

  extraInfo: {
    type: String,
    default: "No extra information provided"
  },

  propertyType: {
    type: String,
    enum: ["apartment", "house", "hotel", "villa","bunglow"],
    default: "house"
  },

  roomtype: {
    type: String,
    enum: ["Anytype", "1BHK", "2BHK", "3BHK"],
    default: "Anytype"
  },

  maximumGuests: {
    type: Number,
    required: [true, "please provide maximum guests"],
  },

  amenities: [
    {
      name:{
        type:String,
        required:true,
        enum:["wifi","kitchen","tv","airconditioner","pool","washing machine","Free parking"]

      },
      icon:{
        type:String,
        required:true
      }
    }
  ],

  images:{
    type:[
      {
        public_id:{type:String},
        url:{type:String,required:true}
      }
    ],
    validate:{
      validator:function(arr){
        return arr.length >=6;

      },
      message: "The image must be atleast 6 images"
    }
  },
  
  price:{
    type:Number,
    required:[true,"please provide price per night"],
    default:500
  },
  address:{
    area:String,
    city:String,
    state:String,
    country:String,
    pincode:Number
  },

  currentBookings:[




  ],
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  slug:String,
  checkInTime:{type:String, default:"12:00 PM"},
  checkOutTime:{type:String, default:"11:00 AM"}
})

propertySchema.pre("save", function(next){
  this.slug= slugify(this.propertyName,{lower:true});
  next();
})

propertySchema.pre("save",function(next){
  this.address.city = this.address.city.toLowerCase().replaceAll(" ","");
  next();
})

const Property = mongoose.model("Property", propertySchema);
export {Property};

