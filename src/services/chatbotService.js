import request from "request";
require('dotenv').config();

const IMAGE_GET_STARTED = 'https://media-exp1.licdn.com/dms/image/C511BAQE0cVYmg8QN0g/company-background_10000/0/1581481407499?e=2159024400&v=beta&t=tp4fzua9GkgJLUYXf0JEMnIBFCM-wlKKDnIuiqfnJbc';
const IMAGE_CONTEST = 'https://images.squarespace-cdn.com/content/v1/5930dc9237c5817c00b10842/1583720217165-KBSW05AQV9NF0B314AV7/87187432_2798026976947868_4257088312969265152_o.jpg';
const IMAGE_RESCONTEST = 'https://www.bacgiang.gov.vn/image/journal/article?img_id=8795337&t=1629951094430';
const IMAGE_CONTACT = 'http://quangbinhuni.edu.vn/wp-content/uploads/2018/08/anhtruong3.jpg';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v12.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}
let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}
let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            let response1 = { "text": `Chào mừng bạn ${username} đến với Duckpe` };
            let response2 = getStartedTemplate();

            //send text mess
            await callSendAPI(sender_psid, response1);

            //send generic template mess
            await callSendAPI(sender_psid, response2);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin chào mừng bạn đến với Duckpe!",
                        "subtitle": "Dưới đây là các lựa chọn.",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Thông tin cửa hàng",
                                "payload": "CONTEST",
                            },
                            {
                                "type": "postback",
                                "title": "Hướng dẫn sử dụng bot",
                                "payload": "USE_GUIDE",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}


let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getMainMenuTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Sản phẩm mới.",
                        "subtitle": "Các sản phẩm công nghệ mới nhất được cập nhật!",
                        "image_url": IMAGE_CONTEST,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Laptop",
                                "payload": "CONTEST_ROLE",
                            },
                            {
                                "type": "postback",
                                "title": "Điện thoại",
                                "payload": "CONTEST_AWARD",
                            },
                            {
                                "type": "postback",
                                "title": "Tai nghe",
                                "payload": "CONTEST_TIME",
                            }
                        ],
                    },
                    {
                        "title": "Sản phẩm bán chạy",
                        "subtitle": "Các sản phẩm bán chạy nhất!",
                        "image_url": IMAGE_RESCONTEST,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Laptop",
                                "payload": "CONTEST_RES1",
                            },
                            {
                                "type": "postback",
                                "title": "Điện thoại",
                                "payload": "CONTEST_RES2",
                            },
                        ],
                    },
                    {
                        "title": "Thông tin liên hệ",
                        "subtitle": "Thời gian liên hệ từ 8h-21h30 từ thứ 2 đến thứ 6",
                        "image_url": IMAGE_CONTACT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Điện thoại",
                                "payload": "PHONE_NUMBER",
                            },
                            {
                                "type": "postback",
                                "title": "Facebook",
                                "payload": "FB_PAGE",
                            },
                            {
                                "type": "postback",
                                "title": "Website cửa hàng",
                                "payload": "WEBSITE",
                            },
                        ],
                    },

                    {
                        "title": "Trờ về menu chính",
                        "subtitle": "",
                        "image_url": IMAGE_CONTACT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quay trờ lại menu chính",
                                "payload": "BACK",
                            },
                        ],
                    }
                ]
            }
        }
    }
    return response;
}


let handleSendContestRole = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getContestRoleTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}
let getContestRoleTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Dưới đây là điều lệ giải",
                "buttons": [
                    {
                        "type": "web_url",
                        "url": "http://doanthanhnien.vn/Content/uploads/Ke%CC%82%CC%81%20hoa%CC%A3ch%20va%CC%80%20The%CC%82%CC%89%20le%CC%A3%CC%82%20Ho%CC%A3%CC%82i%20thi%20Tin%20ho%CC%A3c%20tre%CC%89%202021.pdf",
                        "title": "Tải xuống",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "postback",
                        "title": "Trở về",
                        "payload": "CONTEST",
                    }
                ]
            }
        }
    }
    return response;
}


let handleSendContestAward = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getContestAwardTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getContestAwardTemplate = () => {

}

let handleSendContestTime = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getContestTimeTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getContestTimeTemplate = () => {

}

let handleSendContestRes1 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getContestRes1Template();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getContestRes1Template = () => {

}

let handleSendContestRes2 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getContestRes2Template();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getContestRes2Template = () => {

}

let handleSendPhoneNumber = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getSendPhoneNumberTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getSendPhoneNumberTemplate = () => {

}

let handleSendFbPage = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getSendFbPageTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getSendFbPageTemplate = () => {

}

let handleSendWebsite = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getSendWebsiteTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getSendWebsiteTemplate = () => {

}

let handleBack = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getBackTemplate();
            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getBackTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin chào mừng bạn đến với QBU IT!",
                        "subtitle": "Dưới đây là các lựa chọn.",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Thông tin cuộc thi",
                                "payload": "CONTEST",
                            },
                            {
                                "type": "postback",
                                "title": "Hướng dẫn sử dụng",
                                "payload": "USE_GUIDE",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}

module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendMainMenu: handleSendMainMenu,
    handleSendContestRole: handleSendContestRole,
    handleSendContestAward: handleSendContestAward,
    handleSendContestTime: handleSendContestTime,
    handleSendContestRes1: handleSendContestRes1,
    handleSendContestRes2: handleSendContestRes2,
    handleSendPhoneNumber: handleSendPhoneNumber,
    handleSendFbPage: handleSendFbPage,
    handleSendWebsite: handleSendWebsite,
    handleBack: handleBack
}