Meteor.startup(function () {

  UploadServer.init({
    tmpDir: '/Users/jama/Documents/Uni/Master/E-Business/hoodguide/public/img/tmp/',
    uploadDir: '/Users/jama/Documents/Uni/Master/E-Business/hoodguide/public/img/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
      return formData.contentType;
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      console.log('imageupload');
      if (formData) {
        Images.insert({
          user_id: formData.user_id,
          path: fileInfo.path
        });
      }
    },
    cacheTime: 100,
    mimeTypes: {
        "xml": "application/xml",
        "vcf": "text/x-vcard"
    }
  });
});
