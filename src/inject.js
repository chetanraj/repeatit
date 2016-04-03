!function(){"use strict";window.recipe={},window.recipe.Recipe=function(e,t){this.start=function(){return $.Deferred().resolve()},this.stop=function(){return $.Deferred().resolve()},this.getId=function(){return t},this.steps=e,this.wait=20};var e=function(e,t){var i=document.getElementsByTagName(e);return i[t]},t=function(e){return e?e="object"!=typeof e?JSON.parse(window.decodeURIComponent(e)):e:void 0},i=function(e){for(var t,i=document.evaluate(e,document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null),s=[];t=i.iterateNext();)s.push(t);var n=$([]).pushStack(s);return n},s=function(e,t,i){var s=i.find(function(t){return t._id===e});return s.pSets.find&&s.pSets.find(function(e){return e.title===t}).params};window.recipe.RecipePlayer=function(n,r,c){var o=0,a=0;"string"==typeof c&&(c=JSON.parse(window.decodeURIComponent(c))),window.recipe.usageTracker.recipeStart(n.getId());var p=function(r,o){if(o===r.length)return n.stop.call(n),void(n.getId()===window.recipe.usageTracker.getCurrentRecipe()&&window.recipe.usageTracker.sendUsageStatistics());var u=setInterval(function(){var d=r[o];if("recipe"===d.type){clearInterval(u),a=0;var w=window.recipe[d._id];w.start.call(w,t(s(w.getId(),d.pSet,c))),r.splice.apply(r,[o,1].concat(w.steps)),p(r,o)}else if("wait"===d.type)++o;else if("skip"===d.type)++o;else{var f;if(f=d.selector?$(d.selector):d.xpath?$(i(d.xpath)):$(e(d.tagName,d.index)),f.length>0)l(f,d.action,d),clearInterval(u),a=0,p(r,++o);else{console.log("Looking for "+d.selector+"  "+d.tagName+"   "+d.index),a++;var h=r.wait||n.wait;a>h&&(a=0)}}},500)},l=function(e,t,i){var s,n=i.value;if("function"==typeof t)t.call(e);else switch(t){case"input":e.val(window.recipe.utils.evaluate(n));break;case"redactor":e.redactor("set",window.recipe.utils.evaluate(n));break;case"redactorInsert":e.redactor("getObject").insertHtml(window.recipe.utils.evaluate(n));break;case"keydown":s=document.createEvent("Events"),s.initEvent("keydown",!0,!0),s.keyCode=i.keyCode,e.get(0).dispatchEvent(s);break;case"keyup":s=document.createEvent("Events"),s.initEvent("keyup",!0,!0),s.keyCode=i.keyCode,e.get(0).dispatchEvent(s);break;case"keypress":s=document.createEvent("Events"),s.initEvent("keypress",!0,!0),s.keyCode=i.keyCode,e.get(0).dispatchEvent(s);break;case"mouseup":s=new MouseEvent("mouseup",{view:window,bubbles:!0,cancelable:!0}),e.get(0).dispatchEvent(s);break;case"mousedown":s=new MouseEvent("mousedown",{view:window,bubbles:!0,cancelable:!0}),e.get(0).dispatchEvent(s);break;case"contenteditable":e.get(0).innerHTML=n;break;default:e.get(0).click()}};n.start.call(n,t(s(n.getId(),r,c))).done(function(){p(n.steps.slice(),o)}).fail(function(e){window.alert(e)})},window.recipe.utils={evaluate:function(e){var t=this;return e=e.replace(/{datetime}/g,(new Date).toUTCString()),e=e.replace(/{date}/g,(new Date).toDateString()),e=e.replace(/{time}/g,(new Date).toTimeString()),e=e.replace(/{randomString\([\d]*\)}/g,function(e){return t.randomStringReplacer.call(t,e)}),e=e.replace(/{timeStamp\(?[\d]*\)?}/g,function(e){return t.timeStampReplacer.call(t,e)}),e=e.replace(/{browser}/g,function(){return t.detectBrowser()})},detectBrowser:function(){if(this.browser)return this.browser;var e=!!window.opr&&!!window.opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,t="undefined"!=typeof InstallTrigger,i=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,s=!!document.documentMode,n=!s&&!!window.StyleMedia,r=!!window.chrome&&!!window.chrome.webstore,c=(r||e)&&!!window.CSS;return this.bowser=e?"Opera":t?"Firefox":i?"Safari":r?"Chrome":s?"IE":n?"Edge":c?"Blink":"other"},randomStringReplacer:function(e){var t=e.replace(/[a-zA-Z\(\)\{\}]/g,"");return t=window.isNaN(window.parseInt(t,10))?5:window.parseInt(t,10),this.randomString(t)},timeStampReplacer:function(e){var t=e.replace(/[a-zA-Z\(\)\{\}]/g,"");return t=window.isNaN(window.parseInt(t,10))?13:window.parseInt(t,10),this.timeStamp(t)},timeStamp:function(e){return e=e?e:13,(new Date).getTime().toString().substr(-e)},randomString:function(e){for(var t="abcdefghijklmnopqrstuvwxyz",i="ABCDEFGHIJKLMNOPQRSTUVWXYZ",s=t.split("").concat(i.split("")),n=[],r=0;e>r;r++)n.push(Math.floor(Math.random()*s.length));return n.map(function(e){return s[e]}).join("")}},window.recipe.UsageTracker=function(){var e="",t="",i="";this.sendUsageStatistics=function(){if(e){var t=$.Deferred();n(t),t.done($.proxy(s,this))}};var s=function(){var s=(new Date).getTime(),n=s-i;window.postMessage({type:"TO_REPEATIT",action:"RECORD_USAGE",recipeName:e,at:s,internalIp:t,totalTime:n},"*"),this.recipeStop()},n=function(e){var i=[],s=window.RTCPeerConnection||window.webkitRTCPeerConnection||window.mozRTCPeerConnection,n=new s({iceServers:[]});n.createDataChannel(""),n.onicecandidate=function(s){if(!s.candidate)return n.close(),t=i[0],void e.resolve();var r=/^candidate:.+ (\S+) \d+ typ/.exec(s.candidate.candidate)[1];-1==i.indexOf(r)&&i.push(r)},n.createOffer(function(e){n.setLocalDescription(e)},function(){})};this.recipeStart=function(t){e=t,i=(new Date).getTime()},this.recipeStop=function(){e="",i=""},this.getCurrentRecipe=function(){return e||""}},window.recipe.usageTracker=new window.recipe.UsageTracker}(),function(){"use strict";var e="AddClassicQuestionToAssessmentRecipe",t=[{selector:"#assessments-back-button"},{type:"recipe",_id:"",pSet:""}],i=window.recipe.AddClassicQuestionToAssessmentRecipe=new window.recipe.Recipe(t,e);i.start=function(e){switch($(".as-passage-preview-edit-button").length?(this.steps[0]._id="AddQuestionToPassage",this.steps[0].type="recipe",delete this.steps[0].selector):(this.steps[0].selector="#assessments-back-button",delete this.steps[0]._id,delete this.steps[0].type),e.qtype){case 120:this.steps[1]._id="TrueFalseCreateRecipe";break;case 125:this.steps[1]._id="TextEntryCreateRecipe";break;case 123:this.steps[1]._id="EssayCreateRecipe";break;case 129:this.steps[1]._id="TextDropdownCreateRecipe";break;case 122:this.steps[1]._id="MultipleSelectionCreateRecipe";break;case 116:this.steps[1]._id="MultipleChoiceCreateRecipe"}return $.Deferred().resolve()}}(),function(){"use strict";var e="AddClassicQuestionToAssessmentRecipe",t=[{selector:".ls-ins-browse-icon",action:"click"},{selector:"#ls-ins-all-question-types .ui-dropdownchecklist",action:"click"},{selector:".ui-dropdownchecklist-item input[index=0]",action:"click"},{selector:"",action:"click"},{selector:".ui-dropdownchecklist-done",action:"click"},{selector:".ls-ins-browse-go",action:"click"}],i=window.recipe.AddClassicQuestiontoAssignmentLSRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[3].selector='.ui-dropdownchecklist-item input[value="'+e.self.qtype+'"]',$.Deferred().resolve()}}(),function(){"use strict";var e="AssignAssessmentRecipe",t=[{selector:"#assessments-use-button"},{selector:".share-with-wrap label.radio.i-checks:eq(0)"},{selector:"#assign-button"}],i=window.recipe.AssignAssessmentRecipe=new window.recipe.Recipe(t,e);i.start=function(e){switch(e.self.type){case"right_now":this.steps[1].selector=".share-with-wrap label.radio.i-checks:eq(1)";break;case"publish_and_use_later":this.steps[1].selector=".share-with-wrap label.radio.i-checks:eq(0)"}return $.Deferred().resolve()}}(),function(){"use strict";var e="AttemptAssignmentRecipe",t=[{type:"recipe",_id:"AttemptAssignmentRecipe",pSet:""}],i=window.recipe.AttemptStudentAssignmentRecipe=new window.recipe.Recipe(t,e);i.start=function(){var e=!1,t={".true-false-student-answer-select":120,".text-entry-question-preview":125,".essay-question-preview":123,".text-drop-down":129,".multiple-select":122,".multiple-choice":116};for(var i in t)if(t.hasOwnProperty(i)&&$(i).length){this.steps[0].params.qtype=t[i],e=!0;break}return e||(this.steps[0].params.qtype=0),$.Deferred().resolve()},i.stop=function(){var e=this,t=$.Deferred(),i=window.setInterval(function(){$.active||($(".as-review-confirmation").length||window.recipe.RecipePlayer(e,{}),t.resolve(),window.clearTimeout(i))},500);return t}}(),function(){"use strict";var e="CreateAssessmentWithClassicQuestionRecipe",t=[{type:"skip"},{type:"recipe",_id:"",pSet:""}],i=window.recipe.CreateAssessmentWithClassicQuestionRecipe=new window.recipe.Recipe(t,e);i.start=function(e){switch(this.steps[0]={type:"recipe",_id:"CreateAssessmentRecipe",pSet:""},e.qtype){case 120:this.steps[1]._id="TrueFalseCreateRecipe";break;case 125:this.steps[1]._id="TextEntryCreateRecipe";break;case 123:this.steps[1]._id="EssayCreateRecipe";break;case 129:this.steps[1]._id="TextDropdownCreateRecipe";break;case 122:this.steps[1]._id="MultipleSelectionCreateRecipe";break;case 116:this.steps[1]._id="MultipleChoiceCreateRecipe"}return $.Deferred().resolve()}}(),function(){"use strict";var e="CreateLSAssignmentRecipe",t=[{selector:".ls-dashboard-new-assignment, #new-assignment-button",action:"click"},{selector:"",action:"click"}],i=window.recipe.CreateLSAssignmentRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[1].selector=e.self.selector,$.Deferred().resolve()}}(),function(){"use strict";var e="FillClassicAssignmenttoCreateAssignmentLSRecipe",t=[{selector:"#ls-ins-assignment-name",action:"click"},{selector:"#ls-ins-edit-assignment",action:"input",value:"{datetime} - Assignment Title"},{selector:"#ls-ins-assignment-desc",action:"click"},{selector:"#ls-ins-enter-assignment-desc",action:"input",value:"{datetime} - Assignment Description"},{selector:"body",action:"click"}];window.recipe.FillClassicAssignmenttoCreateAssignmentLSRecipe=new window.recipe.Recipe(t,e)}(),function(){"use strict";var e="FillClassicQuestionRecipe",t=[{type:"recipe",_id:"",pSet:"default"}],i=window.recipe.FillClassicQuestionRecipe=new window.recipe.Recipe(t,e);i.start=function(e){var t,i=$.Deferred(),s=parseInt($("#questionType").val());if(window.isNaN(s)){var n="Looks like you are not on any Classic Question authoring screen";return i.reject(n)}switch(s){case 120:t="FillTrueFalseRecipe";break;case 125:t="FillTextEntryRecipe";break;case 123:t="FillEssayRecipe";break;case 129:t="FillTextDropdownRecipe";break;case 122:t="FillMultipleSelectionRecipe";break;case 116:t="FillMultipleChoiceRecipe"}return this.steps[0]._id=t,this.steps[0].pSet=e.content,i.resolve()}}(),function(){"use strict";var e="GliderEmployerSignUpRecipe",t=[{type:"recipe",_id:"SignUpFlowFillCompanyDetailsRecipe"},{type:"recipe",_id:"SignUpFlowYourRoleRecipe"},{type:"recipe",_id:"SignUpFlowFillSignUpPageRecipe",params:{}}],i=window.recipe.GliderEmployerSignUpRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return console.log(e),this.steps[2].params=e.self,$.Deferred().resolve()}}(),function(){"use strict";var e="GliderFillCompanyDescriptionRecipe",t=[{type:"recipe",_id:"GliderFindIndustryRecipe"},{selector:"textarea[name=empPitch]",action:"input"},{selector:"input[name='empOfficeAddress.street']",action:"input"},{selector:"input[name='empOfficeAddress.suite']",action:"input"},{selector:"input[name='empOfficeAddress.zip']",action:"input"},{selector:"input[name='empPhone']",action:"input"},{selector:"input[name='empWebsite']",action:"input"},{selector:"input[name='empInvest']",action:"input"},{selector:".save-btn"}],i=window.recipe.GliderFillCompanyDescriptionRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[1].value=e.self.oneLinePitch,this.steps[2].value=e.self.oAStreet,this.steps[3].value=e.self.oASuite,this.steps[4].value=e.self.oAZipCode,this.steps[5].value=e.self.phone,this.steps[6].value=e.self.website,this.steps[7].value=e.self.invest,$.Deferred().resolve()}}(),function(){"use strict";var e="InstructorSignupRecipe",t=[{selector:"#first-name",action:"input"},{selector:"#user-email",action:"input"},{selector:"#user-password",action:"input"},{selector:"#retype-password",action:"input"},{selector:'.as-signup-button[mode="teacher"]'},{selector:".as-add-link"},{selector:"#school-name",action:"input"},{selector:".reset-district-box",action:"input"},{selector:"#address",action:"input"},{selector:"#city-name",action:"input"},{selector:"#zip-code",action:"input"},{selector:"#state-name",action:"input"},{selector:".as-add-country-drop-down",action:function(){var e=$(this).find("option").length,t=Math.floor(Math.random()*(e-1))+1;$("option:eq("+t+")",this).attr("selected",!0)}},{selector:".as-add-save-btn"},{selector:".as-add-subjectArea-dropDown",action:function(){var e=$(this).find("option").length,t=Math.floor(Math.random()*(e-1))+1;$("option:eq("+t+")",this).attr("selected",!0),$(this).trigger("change")}},{selector:".as-add-subject-dropDown option:eq(1)",action:function(){$(this).attr("selected",!0)}},{selector:".as-add-grade-dropDown",action:function(){var e=$(this).find("option").length,t=Math.floor(Math.random()*(e-1))+1;$("option:eq("+t+")",this).attr("selected",!0)}},{selector:".as-add-save-btn"},{selector:".as-search-blue-btn"}],i=window.recipe.InstructorSignupRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return window.location.href="/#register/close/teacher",this.steps[0].value=e.self.userName,this.steps[1].value=e.self.email,this.steps[2].value=e.self.password,this.steps[3].value=e.self.password,this.steps[6].value=e.self.schoolName,this.steps[7].value=e.self.districtName,this.steps[8].value=e.self.address,this.steps[9].value=e.self.city,this.steps[10].value=e.self.zip,this.steps[11].value=e.self.state,$.Deferred().resolve()},i.stop=function(){}}(),function(){"use strict";var e="LoginGliderRecipe",t=[{selector:"#at-field-email",action:"input"},{selector:"#at-field-password",action:"input"},{selector:".btn-steplr-submit"}],i=window.recipe.LoginGliderRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[0].value=e.self.email,this.steps[1].value=e.self.password,$.Deferred().resolve()}}(),function(){"use strict";var e="LoginLSRecipe",t=[{selector:"#username",action:"input"},{selector:"#password",action:"input"},{selector:"#loginSubmitBtn"}],i=window.recipe.LoginLSRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[0].value=e.self.email,this.steps[1].value=e.self.password,$.Deferred().resolve()}}(),function(){"use strict";var e="LoginRecipe",t=[{selector:"#login-email",action:"input"},{selector:"#login-password",action:"input"},{selector:"#signIn"}],i=window.recipe.LoginRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[0].value=e.self.email,this.steps[1].value=e.self.password,$.Deferred().resolve()}}(),function(){"use strict";var e="PassageCreateRecipe",t=[{type:"recipe",_id:"CreateAssessmentRecipe"},{selector:"span.lsm-create-btn:first"},{selector:"#qtn-passage-type",wait:100},{selector:"#passage_title",action:"redactor",value:"Passage Title {datetime}"},{selector:".tab-title-text",action:function(){$(this).html("title...")}},{selector:"#question-edit-passage-text",action:"redactor",value:"Something Random {datetime}"},{selector:"#saveQuestionDetails1",action:"click"},{selector:".add-question[style]",action:"click"},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"tf"},{type:"recipe",_id:"FillTrueFalseRecipe",pSet:"default"},{selector:".as-question-editor-back"},{selector:".add-question[style]",action:"click"},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"tf"},{type:"recipe",_id:"FillTrueFalseRecipe",pSet:"default"},{selector:".as-question-editor-back"},{selector:".add-question[style]",action:"click"},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"tf"},{type:"recipe",_id:"FillTrueFalseRecipe",pSet:"default"},{selector:".as-question-editor-back"}];window.recipe.PassageCreateRecipe=new window.recipe.Recipe(t,e)}(),function(){"use strict";var e="AddQuestionToPassageRecipe",t=[{selector:".as-passage-preview-edit-button"},{selector:".add-question"}],i=window.recipe.AddQuestionToPassageRecipe=new window.recipe.Recipe(t,e);i.start=function(){return $.Deferred().resolve()}}(),function(){"use strict";var e="AttemptAssignmentRecipe",t=[{type:"recipe",_id:"",pSet:""},{selector:"#as-take-next-question",action:"click"}],i=window.recipe.AttemptAssignmentRecipe=new window.recipe.Recipe(t,e);i.start=function(e){switch(e.qtype){case 0:this.steps=this.steps.slice(1);break;case 120:this.steps[0]._id="AttemptTrueFalseRecipe";break;case 125:this.steps[0]._id="AttemptTextEntryRecipe";break;case 123:this.steps[0]._id="AttemptEssayRecipe";break;case 129:this.steps[0]._id="AttemptTextDropdownRecipe";break;case 122:this.steps[0]._id="AttemptMultipleSelectRecipe";break;case 116:this.steps[0]._id="AttemptMultipleChoiceRecipe"}return $.Deferred().resolve()}}(),function(){"use strict";var e="AttemptEssayRecipe",t=[{selector:"#html-editor-non-draggable",action:"redactor",value:"something"}],i=window.recipe.AttemptEssayRecipe=new window.recipe.Recipe(t,e);i.start=function(e){var t=$.Deferred();if(0===$(this.steps[0].selector).length){var i="Please make sure to be in Essay question attempt view before using this recipe";t.reject(i)}else t.resolve();return e.value&&(this.steps[0].value=e.value),t.promise()}}(),function(){"use strict";var e="AttemptMultipleChoiceRecipe",t=[{selector:".single-select-choice-icon-preview",action:function(){var e=$(this).length,t=Math.floor(Math.random()*e);$(this).eq(t).click()}}],i=window.recipe.AttemptMultipleChoiceRecipe=new window.recipe.Recipe(t,e);i.start=function(){var e=$.Deferred();if(0===$(this.steps[0].selector).length){var t="Please make sure to be in MultipleChoice question attempt view before using this recipe";e.reject(t)}else e.resolve();return e.promise()}}(),function(){"use strict";var e="AttemptMultipleSelectRecipe",t=[{selector:".multiple-select-choice-icon-preview",action:function(){$(this).filter(function(e){return e%2}).click()}}],i=window.recipe.AttemptMultipleSelectRecipe=new window.recipe.Recipe(t,e);i.start=function(){var e=$.Deferred();if(0===$(this.steps[0].selector).length){var t="Please make sure to be in MultipleSelection question attempt view before using this recipe";e.reject(t)}else e.resolve();return e.promise()}}(),function(){"use strict";var e="AttemptTextDropdownRecipe",t=[{selector:".question-raw-content-dropdown",action:function(){var e=$(this).find("option").length,t=Math.ceil(e*Math.random());t=t===e?t-1:t,$(this).find("option:eq("+t+")").attr("selected",!0)}}],i=window.recipe.AttemptTextDropdownRecipe=new window.recipe.Recipe(t,e);i.start=function(){var e=$.Deferred();if(0===$(this.steps[0].selector).length){var t="Please make sure to be in TextDropDown question attempt view before using this recipe";e.reject(t)}else e.resolve();return e.promise()}}(),function(){"use strict";var e="AttemptTextEntryRecipe",t=[{selector:".visible_redactor_input",action:"input",value:"something"}],i=window.recipe.AttemptTextEntryRecipe=new window.recipe.Recipe(t,e);i.start=function(e){var t=$.Deferred();if(0===$(this.steps[0].selector).length){var i="Please make sure to be in TextEntry question attempt view before using this recipe";t.reject(i)}else t.resolve();return e.value&&(this.steps[0].value=e.value),t.promise()}}(),function(){"use strict";var e="AttemptTrueFalseRecipe",t=[{selector:".true-false-student-answer-select:eq(0)",action:"click"}],i=window.recipe.AttemptTrueFalseRecipe=new window.recipe.Recipe(t,e);i.start=function(e){var t=$.Deferred();if(0===$(this.steps[0].selector).length){var i="Please make sure to be in true/false question authoring view before using this recipe";t.reject(i)}else t.resolve();var s=Math.round(Math.random());return this.steps[0].selector=".true-false-student-answer-select:eq("+s+")",t.promise()}}(),function(){"use strict";var e="CreateAssessmentRecipe",t=[{selector:"#create-assessment-with-val"}],i=window.recipe.CreateAssessmentRecipe=new window.recipe.Recipe(t,e);i.start=function(){var e="#createAssessment/close?cm=assessment";return Backbone.history.navigate(e),Backbone.history.loadUrl(e),$.Deferred().resolve()}}(),function(){"use strict";var e="EssayCreateRecipe",t=[{type:"wait",seconds:2},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"es"},{type:"recipe",_id:"FillEssayRecipe",pSet:"default"},{selector:".lsm-createAssignment-done.selected"}],i=window.recipe.EssayCreateRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return e&&e.assessment?this.steps[0]={type:"recipe",_id:"CreateAssessmentRecipe"}:this.steps[0]={type:"wait",seconds:2},$.Deferred().resolve()}}(),function(){"use strict";var e="FillEssayRecipe",t=[{selector:"#question-raw-content",action:"redactor"},{type:"recipe",_id:"FillSolutionHintRecipe",pSet:"default"},{selector:"#saveQuestionDetails1",action:"click"}],i=window.recipe.FillEssayRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[0].value=e.questionTitle,$.Deferred().resolve()}}(),function(){"use strict";var e="FillMultipleChoiceRecipe",t=[{selector:"#question-mc-raw-content",action:"redactor"},{selector:".redactor-answer-container:eq(0)",action:"redactor",value:"Choice 1"},{selector:".redactor-answer-container:eq(1)",action:"redactor",value:"Choice 2"},{selector:".redactor-answer-container:eq(2)",action:"redactor",value:"Choice 3"},{selector:".redactor-answer-container:eq(3)",action:"redactor",value:"Choice 4"},{selector:".single-select-choice-icon:eq(1)"},{type:"recipe",_id:"FillSolutionHintRecipe",pSet:"default"},{selector:"#saveQuestionDetails1",action:"click"}],i=window.recipe.FillMultipleChoiceRecipe=new window.recipe.Recipe(t,e);i.start=function(e){this.steps[0].value=e.questionTitle;var t=Math.round(3*Math.random());return this.steps[5].selector=".single-select-choice-icon:eq("+t+")",$.Deferred().resolve()}}(),function(){"use strict";var e="FillMultipleSelectionRecipe",t=[{selector:"#question-ms-raw-content",action:"redactor"},{selector:".redactor-answer-container:eq(0)",action:"redactor",value:"Choice 1"},{selector:".redactor-answer-container:eq(1)",action:"redactor",value:"Choice 2"},{selector:".redactor-answer-container:eq(2)",action:"redactor",value:"Choice 3"},{selector:".redactor-answer-container:eq(3)",action:"redactor",value:"Choice 4"},{selector:".multiple-select-choice-icon:eq(1)"},{selector:".multiple-select-choice-icon:eq(1)"},{type:"recipe",_id:"FillSolutionHintRecipe",pSet:"default"},{selector:"#saveQuestionDetails1",action:"click"}],i=window.recipe.FillMultipleSelectionRecipe=new window.recipe.Recipe(t,e);i.start=function(e){this.steps[0].value=e.questionTitle;var t=Math.round(Math.random());return this.steps[5].selector=".multiple-select-choice-icon:eq("+t+")",this.steps[6].selector=".multiple-select-choice-icon:eq("+(2+t)+")",$.Deferred().resolve()}}(),function(){"use strict";var e="FillSolutionHintRecipe",t=[{selector:"#content-solution",action:"redactor"},{selector:"#content-hint",action:"redactor"}],i=window.recipe.FillSolutionHintRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[0].value=e.solution,this.steps[1].value=e.hint,$.Deferred().resolve()}}(),function(){"use strict";var e="FillTextDropdownRecipe",t=[{selector:"#question-raw-content",action:"redactorInsert"},{selector:".text-drop-val:eq(0)"},{selector:".text-drop-down-input:eq(0)",action:function(){this.val("Choice 1").trigger("focusout")}},{selector:".text-drop-val:eq(1)"},{selector:".text-drop-down-input:eq(1)",action:function(){this.val("Choice 2").trigger("focusout")}},{selector:".text-drop-val:eq(2)"},{selector:".text-drop-down-input:eq(2)",action:function(){this.val("Choice 3").trigger("focusout")}},{selector:".text-drop-val:eq(2)"},{selector:".select-icon-text-drop-down:eq(1)"},{selector:".accept_answer"},{type:"recipe",_id:"FillSolutionHintRecipe",pSet:"default"},{selector:"#saveQuestionDetails1",action:"click"}],i=window.recipe.FillTextDropdownRecipe=new window.recipe.Recipe(t,e);i.start=function(e){this.steps[0].value=e.questionTitle;var t=Math.round(Math.random());return this.steps[7].selector=".text-drop-val:eq("+t+")",this.steps[8].selector=".select-icon-text-drop-down:eq("+t+")",$.Deferred().resolve()}}(),function(){"use strict";var e="FillTextEntryRecipe",t=[{selector:"#question-raw-content",action:"redactorInsert"},{selector:".get-user-entry",action:function(){this.val("Correct Answer").trigger("keyup")},value:"Correct Answer"},{selector:".accept_answer"},{type:"recipe",_id:"FillSolutionHintRecipe",pSet:"default"},{selector:"#saveQuestionDetails1",action:"click"}],i=window.recipe.FillTextEntryRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[0].value=e.questionTitle,$.Deferred().resolve()}}(),function(){"use strict";var e="FillTrueFalseRecipe",t=[{selector:"#question-raw-content",action:"redactor"},{selector:".true-false-answer-select:eq(0)",action:"click"},{type:"recipe",_id:"FillSolutionHintRecipe",pSet:"default"},{selector:"#saveQuestionDetails1",action:"click"}],i=window.recipe.FillTrueFalseRecipe=new window.recipe.Recipe(t,e);i.start=function(e){var t=$.Deferred();if(0===$(this.steps[0].selector).length){var i="Please make sure to be in true/false question authoring view before using this recipe";t.reject(i)}else t.resolve();this.steps[0].value=e.questionTitle;var s=Math.round(Math.random());return this.steps[1].selector=".true-false-answer-select:eq("+s+")",t.promise()}}(),function(){"use strict";var e="GliderFindIndustryRecipe",t=[{selector:"input#suggest-categories"}],i=window.recipe.GliderFindIndustryRecipe=new window.recipe.Recipe(t,e);i.start=function(e){this.steps[0].action=function(){for(var e,t,i=["3D Printing","Accounting","Agriculture","Apps","Art","Career Planning","Cars","Charity","Charter Schools","Chat","Child Care","CRM","Crowdfunding","Crowdsourcing","Curated Web","Customer Service","Data Centers","Data Security","Data Visualization","Databases","Delivery","Doctors","Document Management","Human Resources","Identity","Incentives","Incubators","Internet TV","Investment Management","iOS","iPad","Logistics Company","Low Bid Auctions","Loyalty Programs","M2M","Mac","Mobility","Monetization","Moneymaking","Music","Natural Resources","Navigation","New Product Development","News","NFC","Non Profit","Nutrition","Office Space","Facilities Services","Sporting Goods","Think Tanks","Tobacco","Veterinary","Warehousing"],s=0;3>s;s++){var n=Math.floor(Math.random()*i.length);$(this.selector).tagsinput("add",i[n])}e=$(this.selector).tagsinput("items"),t=$("input[name='empCateg']"),t.val(null),t.val(e).trigger("change")}}}(),function(){"use strict";var e="MultipleChoiceCreateRecipe",t=[{type:"wait",seconds:2},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"mc"},{type:"recipe",_id:"FillMultipleChoiceRecipe",pSet:"default"},{selector:".lsm-createAssignment-done.selected"}],i=window.recipe.MultipleChoiceCreateRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return e&&e.assessment?this.steps[0]={type:"recipe",_id:"CreateAssessmentRecipe"}:this.steps[0]={type:"wait",seconds:2},$.Deferred().resolve()}}(),function(){"use strict";var e="MultipleSelectionCreateRecipe",t=[{type:"wait",seconds:2},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"ms"},{type:"recipe",_id:"FillMultipleSelectionRecipe",pSet:"default"},{selector:".lsm-createAssignment-done.selected"}],i=window.recipe.MultipleSelectionCreateRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return e&&e.assessment?this.steps[0]={type:"recipe",_id:"CreateAssessmentRecipe"}:this.steps[0]={type:"wait",seconds:2},$.Deferred().resolve()}}(),function(){"use strict";var e="OpenQuestionAuthoringRecipe",t=[{selector:"span.lsm-create-btn:visible:eq(0)"},{selector:"#qtn-true-false-type",action:"click"}],i=window.recipe.OpenQuestionAuthoringRecipe=new window.recipe.Recipe(t,e);i.start=function(e){var t="#";switch(e.qtype){case 120:t+="qtn-true-false-type";break;case 125:t+="qtn-text-entry-type";break;case 123:t+="qtn-essay-type";break;case 129:t+="qtn-text-drop-down-type";break;case 122:t+="qtn-multiple-selection-type";break;case 116:t+="qtn-multiple-choice-type"}return this.steps[1].selector=t,$.Deferred().resolve()}}(),function(){"use strict";var e="SignUpFlowFillCompanyDetailsRecipe",t=[{selector:"input[name=companyName]",action:function(){this.val("tech").trigger("focus").trigger("change").trigger("input").trigger("focus")}},{selector:".company-result:eq(6)"},{selector:"input[name=companyLocation]",action:function(){this.val("Bangalore, Karnataka").trigger("focus").trigger("change").trigger("input")}},{selector:".next"}],i=window.recipe.SignUpFlowFillCompanyDetailsRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return $.Deferred().resolve()}}(),function(){"use strict";var e="SignUpFlowFillSignUpPageRecipe",t=[{selector:"#at-field-fullname",action:"input"},{selector:"#at-field-mobile",action:"input"},{selector:"#at-field-email",action:"input"},{selector:"#at-field-password",action:"input"},{selector:"#at-field-terms"},{selector:"#signup-button"}],i=window.recipe.SignUpFlowFillSignUpPageRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return this.steps[0].value=e.name,this.steps[1].value=e.phone,this.steps[2].value=e.email,this.steps[3].value=e.password,$.Deferred().resolve()}}(),function(){"use strict";var e="SignUpFlowYourRoleRecipe",t=[{selector:".selectable-box-label:eq(0)"}],i=window.recipe.SignUpFlowYourRoleRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return $.Deferred().resolve()}}(),function(){"use strict";var e="TextDropdownCreateRecipe",t=[{type:"wait",seconds:2},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"td"},{type:"recipe",_id:"FillTextDropdownRecipe",pSet:"default"},{selector:".lsm-createAssignment-done.selected"}],i=window.recipe.TextDropdownCreateRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return e&&e.assessment?this.steps[0]={type:"recipe",_id:"CreateAssessmentRecipe"}:this.steps[0]={type:"wait",seconds:2},$.Deferred().resolve()}}(),function(){"use strict";var e="TextEntryCreateRecipe",t=[{type:"wait",seconds:2},{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"te"},{type:"recipe",_id:"FillTextEntryRecipe",pSet:"te"},{selector:".lsm-createAssignment-done.selected"}],i=window.recipe.TextEntryCreateRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return e&&e.assessment?this.steps[0]={type:"recipe",_id:"CreateAssessmentRecipe"}:this.steps[0]={type:"wait",seconds:2},$.Deferred().resolve()}}(),function(){"use strict";var e="TrueFalseCreateRecipe",t=[{type:"recipe",_id:"OpenQuestionAuthoringRecipe",pSet:"tf"},{type:"recipe",_id:"FillTrueFalseRecipe",pSet:"default"},{selector:".lsm-createAssignment-done.selected"}],i=window.recipe.TrueFalseCreateRecipe=new window.recipe.Recipe(t,e);i.start=function(e){return $.Deferred().resolve()}}(),function(){"use strict";var e=window.recipe.Recorder={isRecording:!1,startRecording:function(){this.steps=[],this.isRecording=!0},stopRecording:function(){return this.isRecording=!1,this.steps},addEvent:function(e){if(this.isRecording){var t=this.steps.pop();t?e.tagName===t.tagName&&e.index===t.index&&e.action===t.action&&e.xpath===t.xpath?this.steps.push(e):(this.steps.push(t),this.steps.push(e)):this.steps.push(e)}}};window.recipe.initRecordedRecipes=function(e){for(var t in e){var i=e[t],s=i.recipeId,n=i.steps;window.recipe[s]=new window.recipe.Recipe(n,s)}};var t=function(e,t){var i=document.getElementsByTagName(e);return Array.prototype.indexOf.call(i,t)},i=function(e){if(!e||1!=e.nodeType)return"";var t=[].filter.call(e.parentNode.children,function(t){return t.tagName==e.tagName});return i(e.parentNode)+"/"+e.tagName.toLowerCase()+(t.length>1?"["+([].indexOf.call(t,e)+1)+"]":"")},s=function(s){var n=s.target,r=n.tagName,c=t(r,n),o={tagName:r,index:c,action:event.type,xpath:i(n)};"INPUT"!==r||"keyup"!==event.type&&"keydown"!==event.type&&"keypress"!==event.type?"input"===event.type&&(n.contentEditable===!0?(o.action="contenteditable",o.value=n.innerHTML):"INPUT"===n.tagName||"TEXTAREA"===n.tagName?o.value=n.value:o=void 0):13===event.keyCode?(o.keyCode=event.keyCode,o.action=event.type):o=null,o&&e.addEvent(o)},n=function(e,t){window.postMessage({type:"TO_REPEATIT",action:"SAVE_RECORDING_STEPS",steps:e,recipeId:t},"*")},r=function(){window.addEventListener("message",function(e){
if("FROM_REPEATIT"===e.data.type)switch(e.data.action){case"START_RECORDING":window.recipe.Recorder.startRecording();break;case"STOP_RECORDING":var t=window.recipe.Recorder.stopRecording(),i="RecordingRecipe-"+e.data.recordingCount;window.recipe[i]=new window.recipe.Recipe(t,i),n(t,i);break;case"FETCHED_RECORDINGS":console.log("Fetched recordings from extension."),window.recipe.initRecordedRecipes(e.data.recipes)}},!1);var e=document.body;e.addEventListener("click",s,!0),e.addEventListener("mouseup",s,!0),e.addEventListener("mousedown",s,!0),e.addEventListener("input",s,!0),e.addEventListener("keypress",s,!0),e.addEventListener("keydown",s,!0),e.addEventListener("keyup",s,!0)};r(),window.postMessage({type:"TO_REPEATIT",action:"FETCH_RECORDINGS"},"*")}();