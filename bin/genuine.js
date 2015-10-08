#!/usr/bin/env node
'use strict'
var fs = require('fs');
var userArgs = process.argv.slice(2);
var exec = require('child_process').exec;
var pattern = /^[a-z\_\-]+$/;
var repoSlug = "codeKonami/genuine.js";
var genuine = {
  create : function(){
    console.log("Creating project " + projectName + "...");
    var child = exec('git clone https://github.com/'+ repoSlug +'.git ' + projectName, function(err, stdout, stderr) {
      if(err){
        console.log(stderr);
        return;
      }
      console.log("Project " + projectName + " created.");
      var child = exec('rm -Rf ' + projectName + '/.git', function(err, stdout, stderr) {
        fs.writeFile(projectName + '/genuine.json', JSON.stringify({"app_name" : projectName}, null, 4), function(err) {
          if(err) {
            return console.log(err);
          }
          console.log("The file genuine.json has been added to the project.");
        });
      });
    });
  },
  shows : function(){
    console.log("Usage: genuine [action] <name of the project>");
    console.log("\n");
    console.log("Actions:");
    console.log("  create         create a new project");
    console.log("  shows help     show this page");
  }
}

if(userArgs.length < 2){
  console.log("genuine needs two arguments. Type *genuine shows help* for more information");
} else if(!pattern.test(userArgs[0])||!pattern.test(userArgs[1])){
  console.log("The action and the name of the project need to be lowercase without numbers. '-' and '_' are ok.");
} else if(typeof genuine[userArgs[0]] == 'undefined'){
  console.log("The action "+action+" isn't valid. Type *genuine shows help* for more information");
} else {
  // It seems everything is fine
  var action = userArgs[0];
  var projectName = userArgs[1];
  if(typeof userArgs[2] != 'undefined'){
    repoSlug = userArgs[2];
  }
  genuine[action]();
}
