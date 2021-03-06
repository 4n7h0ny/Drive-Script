function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('form.html');
}

function uploadFiles(form) {
  
  try {
    //the folder ID is taken from the drive make sure the linked folder is accessable by link sharing with no account necessary, this means anyone with the link can view the uploaded docs
    // I need to change the uploaded shared folder once I get the form email confirmation working correctly
    //also make sure that you run doGet from the server.gs before publishing as a webapp
    //I still cant figure out the email confirmation but working on it at the end of this script AN 03.31.16
    
    var folder = DriveApp.getFolderById("0BzEb-000000this is a test folder will not work");
    
    //Above is the folder ID, use the string in the folder link and update in quotes
    
    var blob = form.myFile;    
    var file = folder.createFile(blob);    
    file.setDescription("Uploaded by " + form.myName);
    
    // Send email
    var information = form.info;
    var Link = file.getUrl();
    var Name = form.Name;
    var Email = form.Email;
    
    var message = "Dear " +Name +", \n\nThank you for your submission! You can view it here: " + Link + "\n\nAll best,\nMy Name Here\nTest@email.com";
    MailApp.sendEmail(Email, "Name of Submission", message);
        
    return "File uploaded successfully " + Link;
    
  } catch (error) {
    
    return error.toString();
  }
}
