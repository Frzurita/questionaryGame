module.exports = {
    "resize": resize,
    "upPhoto": upPhoto
};


var exec = require('child_process').exec;
var q = require('q');
var fs = require('fs');
var imageSize = require('image-size');


var limit="-limit memory 64MiB -limit map 64MiB";
var imageQuality="-density 150";

function resize(height,image,imageSave) {
    var defered= q.defer();
    var promise=defered.promise;
    exec("convert "+limit+" "+imageQuality+" " + image + "[0] -resize x"+height+" "+imageSave, function (error, stdout, stderr) {
       if(!error) {
           defered.resolve('ok');
       }else{
           defered.resolve('notOk');
       }
    });
    return promise;
}

var types= ['png','jpg','jpeg','bmp','gif'];
var maxDimensions=5000;
var maxSize=10 * 1024 * 1027; //10mb

function upPhoto(req,idName,type,imageFileResizeHeight){

    //TODO:Comprobar tamaño de la imagen

    var defered= q.defer();
    var promise=defered.promise;


    var filesize=req.files.file.size;
    var path = req.files.file.path;
    var extension=req.files.file.type.split('/');
    extension=extension[1];

    var upload = './uploads/'+type;
    var imageFile=upload+'/'+idName+'.'+extension;
    var imageFileResize='./frontend/img/'+type+'/'+idName+'.jpg';

    if (filesize < maxSize && types.indexOf(extension.toLowerCase()) != -1){
        fs.readFile(path, function (err, data) {
            fs.writeFile(imageFile, data, function (err) {
                //imageSize(imageFile);
                //var dimensions = imageSize(imageFile);
               // if (dimensions.width <= maxDimensions && dimensions.height <= maxDimensions) {

                    resize(imageFileResizeHeight,imageFile,imageFileResize).then(function(data) {

                        if(data=='ok'){
                            defered.resolve('ok');
                        }else{
                            defered.resolve('notOk');
                        }
                    });
               // }else{
               //     defered.resolve('notOk');
               // }
            });
        });
    }else{
        defered.resolve('notOk');
    }

    return promise;
}
