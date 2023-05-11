
# Twitter Clone Project

### **This is a full stack twitter clone project with nextjs. both frontend and backend are created in nextjs. The project includes user registration , login , email verification , creating, updating and deleting tweet, retweet a tweet , comment to a tweet, reply to a comment, sending one to one messages to user , message notification , updating user , and logout .**

## Indices

* [Ungrouped](#ungrouped)

  * [Create A Tweet](#1-create-a-tweet)
  * [Create socket connection](#2-create-socket-connection)
  * [Delete A Retweet](#3-delete-a-retweet)
  * [Delete A Tweet](#4-delete-a-tweet)
  * [Follow An User](#5-follow-an-user)
  * [Get Paginated Conversation](#6-get-paginated-conversation)
  * [Get Replies of A Specific Tweet Or Comment](#7-get-replies-of-a-specific-tweet-or-comment)
  * [Get Tweet Feed](#8-get-tweet-feed)
  * [Like A Tweet](#9-like-a-tweet)
  * [Register User](#10-register-user)
  * [Reply To A Tweet Or Comment](#11-reply-to-a-tweet-or-comment)
  * [Retweet A Specific Tweet](#12-retweet-a-specific-tweet)
  * [Search An User By Name and Email](#13-search-an-user-by-name-and-email)
  * [Send Message To An User](#14-send-message-to-an-user)
  * [Update A Tweet](#15-update-a-tweet)


--------


## Ungrouped



### 1. Create A Tweet


#### **Api endpoint to create tweet in twitter clone app.**


***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: http://localhost:3000/api/tweet
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |
| content | this is a tweet |  |



***More example Requests/Responses:***


##### I. Example Request: Tweet



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |
| content | this is a tweet |  |



##### I. Example Response: Tweet
```js
{
    "success": true,
    "data": {
        "content": {
            "image": "http://localhost:3000/uploads/875092be6f0732c8b8a7cce15.jpg"
        },
        "likes": [],
        "replies": [],
        "retweets": [],
        "user": {
            "id": "643657302b30ef35ad11c622",
            "username": "sib.sustswe",
            "name": "Sabit Islam",
            "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
        },
        "type": "tweet",
        "totalLikes": 0,
        "totalReplies": 0,
        "totalRetweets": 0,
        "createdAt": "2023-05-09T10:11:14.794Z",
        "updatedAt": "2023-05-09T10:11:14.794Z",
        "id": "645a1c42a2930a0311d3ba4b"
    },
    "error": null
}
```


***Status Code:*** 201

<br>



### 2. Create socket connection



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/socket
```



***More example Requests/Responses:***


##### I. Example Request: Create socket connection



##### I. Example Response: Create socket connection
```js
{
    "success": true
}
```


***Status Code:*** 200

<br>



### 3. Delete A Retweet


#### **Api endpoint to delete a retweet.**


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/retweet
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| tweetId | 645a011fa2930a0311d3b812 |  |



***More example Requests/Responses:***


##### I. Example Request: retweet delete



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| tweetId | 645a1de0a2930a0311d3ba53 |  |



##### I. Example Response: retweet delete
```js
{
    "success": true,
    "error": null,
    "data": {}
}
```


***Status Code:*** 200

<br>



### 4. Delete A Tweet


#### Api endpoint for deleting an existing tweet


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/tweet/6459ee3aa2930a0311d3b809
```



***More example Requests/Responses:***


##### I. Example Request: delete tweet



##### I. Example Response: delete tweet
```js
{
    "success": true
}
```


***Status Code:*** 200

<br>



### 5. Follow An User


#### **Api endpoint to follow a user in twitter clone project.**


***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3000/api/follow/643657302b30ef35ad11c622
```



***More example Requests/Responses:***


##### I. Example Request: follow



##### I. Example Response: follow
```js
{
    "success": true,
    "error": null,
    "data": {}
}
```


***Status Code:*** 200

<br>



### 6. Get Paginated Conversation


#### **Api endpoint to get paginated conversation.**


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/conversation
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| pageIndex | 1 |  |
| pageSize | 30 |  |



***Body:***

```js        
{
    "receiverID":"643cd86513a53c746924c1e6"
}
```



***More example Requests/Responses:***


##### I. Example Request: Get Paginated Conversation



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| pageIndex | 1 |  |
| pageSize | 5 |  |



***Body:***

```js        
{
    "receiverID":"643cd86513a53c746924c1e6"
}
```



##### I. Example Response: Get Paginated Conversation
```js
{
    "success": true,
    "error": null,
    "data": [
        {
            "content": {
                "text": "3"
            },
            "sender": "643cd86513a53c746924c1e6",
            "receiver": "643657302b30ef35ad11c622",
            "senderReact": "none",
            "receiverReact": "none",
            "seen": true,
            "createdAt": "2023-05-11T05:14:17.477Z",
            "id": "645c79a932a534e37ab7ec53"
        },
        {
            "content": {
                "text": "12"
            },
            "sender": "643657302b30ef35ad11c622",
            "receiver": "643cd86513a53c746924c1e6",
            "senderReact": "none",
            "receiverReact": "none",
            "seen": true,
            "createdAt": "2023-05-11T05:14:12.664Z",
            "id": "645c79a432a534e37ab7ec23"
        },
        {
            "content": {
                "text": "9"
            },
            "sender": "643cd86513a53c746924c1e6",
            "receiver": "643657302b30ef35ad11c622",
            "senderReact": "none",
            "receiverReact": "none",
            "seen": true,
            "createdAt": "2023-05-11T05:14:07.748Z",
            "id": "645c799f32a534e37ab7ebf4"
        },
        {
            "content": {
                "text": "8"
            },
            "sender": "643657302b30ef35ad11c622",
            "receiver": "643cd86513a53c746924c1e6",
            "senderReact": "none",
            "receiverReact": "none",
            "seen": true,
            "createdAt": "2023-05-11T05:14:02.318Z",
            "id": "645c799a32a534e37ab7ebc6"
        },
        {
            "content": {
                "text": "7"
            },
            "sender": "643cd86513a53c746924c1e6",
            "receiver": "643657302b30ef35ad11c622",
            "senderReact": "none",
            "receiverReact": "none",
            "seen": true,
            "createdAt": "2023-05-11T05:13:57.306Z",
            "id": "645c799532a534e37ab7eb99"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 7. Get Replies of A Specific Tweet Or Comment


#### **Api endpoint to get paginated replies of a tweet.**


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/reply
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| pageIndex | 1 |  |
| pageSize | 10 |  |
| tweetId | 645a0578a2930a0311d3b824 |  |



***More example Requests/Responses:***


##### I. Example Request: get replies of specific tweet



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| pageIndex | 1 |  |
| pageSize | 5 |  |
| tweetId | 645a1c42a2930a0311d3ba4b |  |



##### I. Example Response: get replies of specific tweet
```js
{
    "pageIndex": "1",
    "pageSize": "10",
    "data": [
        {
            "content": {
                "text": "hi there",
                "image": null
            },
            "likes": [],
            "parent": {
                "replies": [],
                "id": "645a1c42a2930a0311d3ba4b"
            },
            "user": {
                "id": "643657302b30ef35ad11c622",
                "username": "sib.sustswe",
                "name": "Sabit Islam",
                "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
            },
            "type": "reply",
            "totalLikes": 0,
            "totalReplies": 0,
            "totalRetweets": 0,
            "createdAt": "2023-05-09T10:20:57.705Z",
            "updatedAt": "2023-05-09T10:20:57.705Z",
            "isLiked": false,
            "replies": [],
            "id": "645a1e89a2930a0311d3ba5b"
        }
    ]
}
```


***Status Code:*** 200

<br>



##### II. Example Request: wrong tweet Id



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| pageIndex | 1 |  |
| pageSize | 5 |  |
| tweetId | 645a1c42a2930a0311d |  |



##### II. Example Response: wrong tweet Id
```js
{
    "success": false,
    "error": "something went wrong",
    "data": {}
}
```


***Status Code:*** 500

<br>



### 8. Get Tweet Feed


#### **Api endpoint to get paginated newsfeed.**


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/feed
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| pageIndex | 1 |  |
| pageSize | 30 |  |



***More example Requests/Responses:***


##### I. Example Request: feed



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| pageIndex | 1 |  |
| pageSize | 30 |  |



##### I. Example Response: feed
```js
{
    "success": true,
    "error": null,
    "data": {
        "pageIndex": "1",
        "pageSize": "30",
        "data": [
            {
                "content": {
                    "text": "dsasdas"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643cd86513a53c746924c1e6",
                    "username": "shawon2046",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028600.jpeg"
                },
                "type": "tweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-09T11:46:01.007Z",
                "updatedAt": "2023-05-09T11:46:01.007Z",
                "isLiked": false,
                "replies": [],
                "id": "645a3279a2930a0311d3bf38"
            },
            {
                "content": {
                    "text": "fdf"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643cd86513a53c746924c1e6",
                    "username": "shawon2046",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028600.jpeg"
                },
                "type": "tweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-09T11:45:53.142Z",
                "updatedAt": "2023-05-09T11:45:53.142Z",
                "isLiked": false,
                "replies": [],
                "id": "645a3271a2930a0311d3bf35"
            },
            {
                "content": {
                    "text": "hi there",
                    "image": "http://localhost:3000/uploads/875092be6f0732c8b8a7cce17.png"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "username": "sib.sustswe",
                    "name": "Sabit Islam",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": 0,
                "totalReplies": 1,
                "totalRetweets": 0,
                "createdAt": "2023-05-09T10:11:14.794Z",
                "updatedAt": "2023-05-09T10:20:58.165Z",
                "isLiked": false,
                "replies": [],
                "id": "645a1c42a2930a0311d3ba4b"
            },
            {
                "content": {
                    "text": "hi there",
                    "image": "http://localhost:3000/uploads/875092be6f0732c8b8a7cce12.png"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "username": "sib.sustswe",
                    "name": "Sabit Islam",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-09T09:21:55.067Z",
                "updatedAt": "2023-05-09T09:34:17.052Z",
                "isLiked": false,
                "replies": [],
                "id": "645a10b3a2930a0311d3b891"
            },
            {
                "likes": [],
                "retweets": [],
                "parent": {
                    "content": {
                        "text": "hi there",
                        "image": "http://localhost:3000/uploads/875092be6f0732c8b8a7cce0a.jpg"
                    },
                    "likes": [
                        "643657302b30ef35ad11c622"
                    ],
                    "retweets": [
                        "645a0f7fa2930a0311d3b868"
                    ],
                    "user": {
                        "id": "643657302b30ef35ad11c622",
                        "username": "sib.sustswe",
                        "name": "Sabit Islam",
                        "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                    },
                    "type": "tweet",
                    "totalLikes": 1,
                    "totalReplies": 2,
                    "totalRetweets": 1,
                    "createdAt": "2023-05-09T08:35:24.464Z",
                    "updatedAt": "2023-05-09T09:19:11.368Z",
                    "isLiked": true,
                    "replies": [],
                    "id": "645a05cca2930a0311d3b82c"
                },
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "username": "sib.sustswe",
                    "name": "Sabit Islam",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "retweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-09T09:16:47.390Z",
                "updatedAt": "2023-05-09T09:16:47.390Z",
                "isLiked": false,
                "replies": [],
                "id": "645a0f7fa2930a0311d3b868"
            },
            {
                "content": {
                    "text": "hi there",
                    "image": "http://localhost:3000/uploads/875092be6f0732c8b8a7cce0a.jpg"
                },
                "likes": [
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [
                    "645a0f7fa2930a0311d3b868"
                ],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "username": "sib.sustswe",
                    "name": "Sabit Islam",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": 1,
                "totalReplies": 2,
                "totalRetweets": 1,
                "createdAt": "2023-05-09T08:35:24.464Z",
                "updatedAt": "2023-05-09T09:19:11.368Z",
                "isLiked": true,
                "replies": [],
                "id": "645a05cca2930a0311d3b82c"
            },
            {
                "content": {
                    "text": "undefinedhj",
                    "image": "http://localhost:3000/uploads/875092be6f0732c8b8a7cce0b.png"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "username": "sib.sustswe",
                    "name": "Sabit Islam",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-09T08:34:00.232Z",
                "updatedAt": "2023-05-09T09:21:34.320Z",
                "isLiked": false,
                "replies": [],
                "id": "645a0578a2930a0311d3b824"
            },
            {
                "likes": [],
                "retweets": [],
                "parent": null,
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "username": "sib.sustswe",
                    "name": "Sabit Islam",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "retweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-09T08:16:02.595Z",
                "updatedAt": "2023-05-09T08:16:02.595Z",
                "isLiked": false,
                "replies": [],
                "id": "645a0142a2930a0311d3b815"
            },
            {
                "content": {
                    "text": "kl",
                    "image": "http://localhost:3000/uploads/f77148df2bb92574f1d1d6603.jpg"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "name": "Sabit Islam",
                    "username": "sib.sustswe",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": -10,
                "totalReplies": 8,
                "totalRetweets": 0,
                "createdAt": "2023-05-04T09:37:19.934Z",
                "updatedAt": "2023-05-08T03:59:54.632Z",
                "isLiked": false,
                "replies": [],
                "id": "64537ccf50686c74e7642cc8"
            },
            {
                "likes": [],
                "retweets": [],
                "parent": null,
                "user": {
                    "id": "643cd86513a53c746924c1e6",
                    "username": "shawon2046",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028600.jpeg"
                },
                "type": "retweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-03T11:42:14.774Z",
                "updatedAt": "2023-05-03T11:42:14.774Z",
                "isLiked": false,
                "replies": [],
                "id": "645248965664622eae32fef8"
            },
            {
                "likes": [],
                "retweets": [],
                "parent": null,
                "user": {
                    "id": "643cd86513a53c746924c1e6",
                    "username": "shawon2046",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028600.jpeg"
                },
                "type": "retweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-05-03T11:41:16.912Z",
                "updatedAt": "2023-05-03T11:41:16.912Z",
                "isLiked": false,
                "replies": [],
                "id": "6452485c5664622eae32fee7"
            },
            {
                "content": {
                    "text": "rrrrrr hi fds fasd fgad",
                    "image": "undefined"
                },
                "likes": [
                    "643cd86513a53c746924c1e6",
                    "643657302b30ef35ad11c622",
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [
                    "64532dad50686c74e7642a6e"
                ],
                "user": {
                    "id": "643cd86513a53c746924c1e6",
                    "username": "shawon2046",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028600.jpeg"
                },
                "type": "tweet",
                "totalLikes": -2,
                "totalReplies": 0,
                "totalRetweets": 1,
                "createdAt": "2023-04-27T09:49:32.447Z",
                "updatedAt": "2023-05-06T21:53:48.362Z",
                "isLiked": true,
                "replies": [],
                "id": "644a452c36389aea59197083"
            },
            {
                "content": {
                    "text": "One day you and me",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028602.jpg"
                },
                "likes": [
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [],
                "user": {
                    "id": "643cd86513a53c746924c1e6",
                    "username": "shawon2046",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028600.jpeg"
                },
                "type": "tweet",
                "totalLikes": 2,
                "totalReplies": 1,
                "totalRetweets": 0,
                "createdAt": "2023-04-17T05:29:16.493Z",
                "updatedAt": "2023-05-07T18:20:10.976Z",
                "isLiked": true,
                "replies": [],
                "id": "643cd92c13a53c746924c207"
            },
            {
                "likes": [],
                "retweets": [],
                "parent": {
                    "content": {
                        "text": "fdsagfasd",
                        "image": "http://localhost:3000/uploads/f77148df2bb92574f1d1d6600.png"
                    },
                    "likes": [
                        "643657302b30ef35ad11c622"
                    ],
                    "retweets": [
                        "643cd91313a53c746924c1ff"
                    ],
                    "user": {
                        "id": "643657302b30ef35ad11c622",
                        "name": "Sabit Islam",
                        "username": "sib.sustswe",
                        "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                    },
                    "type": "tweet",
                    "totalLikes": 0,
                    "totalReplies": 3,
                    "totalRetweets": 1,
                    "createdAt": "2023-04-13T07:13:13.878Z",
                    "updatedAt": "2023-05-07T18:22:42.952Z",
                    "isLiked": true,
                    "replies": [],
                    "id": "6437ab898df35e69f5602628"
                },
                "user": {
                    "id": "643cd86513a53c746924c1e6",
                    "username": "shawon2046",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "image": "http://localhost:3000/uploads/0b1a2494fb547235d42028600.jpeg"
                },
                "type": "retweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-04-17T05:28:51.542Z",
                "updatedAt": "2023-04-17T05:28:51.542Z",
                "isLiked": false,
                "replies": [],
                "id": "643cd91313a53c746924c1ff"
            },
            {
                "content": {
                    "text": "asdfgsdffgasd"
                },
                "likes": [
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [
                    "6453309950686c74e7642ad2"
                ],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "name": "Sabit Islam",
                    "username": "sib.sustswe",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": 1,
                "totalReplies": 0,
                "totalRetweets": 1,
                "createdAt": "2023-04-13T07:13:26.362Z",
                "updatedAt": "2023-05-07T18:22:42.952Z",
                "isLiked": true,
                "replies": [],
                "id": "6437ab968df35e69f5602634"
            },
            {
                "content": {
                    "text": "fsadgsdfagvasdv"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "name": "Sabit Islam",
                    "username": "sib.sustswe",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": -1,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-04-13T07:13:20.777Z",
                "updatedAt": "2023-05-07T18:22:42.952Z",
                "isLiked": false,
                "replies": [],
                "id": "6437ab908df35e69f560262e"
            },
            {
                "content": {
                    "text": "gsagasdfgasd"
                },
                "likes": [],
                "retweets": [],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "name": "Sabit Islam",
                    "username": "sib.sustswe",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": -1,
                "totalReplies": 1,
                "totalRetweets": 0,
                "createdAt": "2023-04-13T07:13:17.320Z",
                "updatedAt": "2023-05-07T18:22:42.952Z",
                "isLiked": false,
                "replies": [],
                "id": "6437ab8d8df35e69f560262b"
            },
            {
                "content": {
                    "text": "fdsagfasd",
                    "image": "http://localhost:3000/uploads/f77148df2bb92574f1d1d6600.png"
                },
                "likes": [
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [
                    "643cd91313a53c746924c1ff"
                ],
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "name": "Sabit Islam",
                    "username": "sib.sustswe",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "tweet",
                "totalLikes": 0,
                "totalReplies": 3,
                "totalRetweets": 1,
                "createdAt": "2023-04-13T07:13:13.878Z",
                "updatedAt": "2023-05-07T18:22:42.952Z",
                "isLiked": true,
                "replies": [],
                "id": "6437ab898df35e69f5602628"
            },
            {
                "likes": [],
                "retweets": [],
                "parent": {
                    "content": {
                        "text": "fgdsg"
                    },
                    "likes": [
                        "643657302b30ef35ad11c622"
                    ],
                    "retweets": [
                        "64350e919f401dcd4e36239f",
                        "643666452b30ef35ad11c6ea"
                    ],
                    "user": {
                        "id": "6434e87f9f401dcd4e3621ad",
                        "name": "maruf maruf",
                        "username": "maruf",
                        "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b10.jpg"
                    },
                    "type": "tweet",
                    "totalLikes": 1,
                    "totalReplies": 22,
                    "totalRetweets": 2,
                    "createdAt": "2023-04-11T05:09:45.512Z",
                    "updatedAt": "2023-05-06T21:15:26.040Z",
                    "isLiked": true,
                    "replies": [],
                    "id": "6434eb999f401dcd4e3621d6"
                },
                "user": {
                    "id": "643657302b30ef35ad11c622",
                    "name": "Sabit Islam",
                    "username": "sib.sustswe",
                    "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
                },
                "type": "retweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-04-12T08:05:25.089Z",
                "updatedAt": "2023-05-07T18:22:42.952Z",
                "isLiked": false,
                "replies": [],
                "id": "643666452b30ef35ad11c6ea"
            },
            {
                "likes": [],
                "retweets": [],
                "parent": {
                    "content": {
                        "text": "fgdsg"
                    },
                    "likes": [
                        "643657302b30ef35ad11c622"
                    ],
                    "retweets": [
                        "64350e919f401dcd4e36239f",
                        "643666452b30ef35ad11c6ea"
                    ],
                    "user": {
                        "id": "6434e87f9f401dcd4e3621ad",
                        "name": "maruf maruf",
                        "username": "maruf",
                        "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b10.jpg"
                    },
                    "type": "tweet",
                    "totalLikes": 1,
                    "totalReplies": 22,
                    "totalRetweets": 2,
                    "createdAt": "2023-04-11T05:09:45.512Z",
                    "updatedAt": "2023-05-06T21:15:26.040Z",
                    "isLiked": true,
                    "replies": [],
                    "id": "6434eb999f401dcd4e3621d6"
                },
                "user": {
                    "id": "6434e87f9f401dcd4e3621ad",
                    "username": "maruf",
                    "name": "maruf maruf",
                    "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b10.jpg"
                },
                "type": "retweet",
                "totalLikes": 0,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-04-11T07:38:57.491Z",
                "updatedAt": "2023-04-11T07:38:57.491Z",
                "isLiked": false,
                "replies": [],
                "id": "64350e919f401dcd4e36239f"
            },
            {
                "content": {
                    "text": "fgdsg"
                },
                "likes": [
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [
                    "64350e919f401dcd4e36239f",
                    "643666452b30ef35ad11c6ea"
                ],
                "user": {
                    "id": "6434e87f9f401dcd4e3621ad",
                    "name": "maruf maruf",
                    "username": "maruf",
                    "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b10.jpg"
                },
                "type": "tweet",
                "totalLikes": 1,
                "totalReplies": 22,
                "totalRetweets": 2,
                "createdAt": "2023-04-11T05:09:45.512Z",
                "updatedAt": "2023-05-06T21:15:26.040Z",
                "isLiked": true,
                "replies": [],
                "id": "6434eb999f401dcd4e3621d6"
            },
            {
                "content": {
                    "text": "fsdafasd",
                    "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b01.png"
                },
                "likes": [
                    "6434e87f9f401dcd4e3621ad",
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [],
                "user": {
                    "id": "6434e87f9f401dcd4e3621ad",
                    "name": "maruf maruf",
                    "username": "maruf",
                    "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b10.jpg"
                },
                "type": "tweet",
                "totalLikes": 2,
                "totalReplies": 4,
                "totalRetweets": 0,
                "createdAt": "2023-04-11T05:01:47.130Z",
                "updatedAt": "2023-05-06T21:14:38.595Z",
                "isLiked": true,
                "replies": [],
                "id": "6434e9bb9f401dcd4e3621c3"
            },
            {
                "content": {
                    "text": "fgasdgfasd",
                    "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b00.png"
                },
                "likes": [
                    "643657302b30ef35ad11c622",
                    "643657302b30ef35ad11c622"
                ],
                "retweets": [],
                "user": {
                    "id": "6434e87f9f401dcd4e3621ad",
                    "name": "maruf maruf",
                    "username": "maruf",
                    "image": "http://localhost:3000/uploads/1a5e9f3abfcdde84f06650b10.jpg"
                },
                "type": "tweet",
                "totalLikes": 1,
                "totalReplies": 0,
                "totalRetweets": 0,
                "createdAt": "2023-04-11T05:01:37.688Z",
                "updatedAt": "2023-05-06T21:57:59.936Z",
                "isLiked": true,
                "replies": [],
                "id": "6434e9b19f401dcd4e3621c0"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



### 9. Like A Tweet


#### **Api endpoint to like a tweet , retweet or reply.**


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/like
```



***Body:***

```js        
{
    "tweetId":"6459ea7ba2930a0311d3b7fe"
}
```



***More example Requests/Responses:***


##### I. Example Request: like



***Body:***

```js        
{
    "tweetId":"6459ea7ba2930a0311d3b7fe"
}
```



##### I. Example Response: like
```js
{
    "success": true,
    "error": null,
    "data": {
        "message": "liked successfully"
    }
}
```


***Status Code:*** 200

<br>



### 10. Register User


#### **Request to register user in twitter clone app.**


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/user
```



***Body:***

```js        
{
    "name":"md sabit islam bhuiya",
    "email":"sabit663@gmail.com",
    "password":"12345678",
    "dateOfBirth":"12-12-2000"
}
```



***More example Requests/Responses:***


##### I. Example Request: success



***Body:***

```js        
{
    "name":"md sabit islam bhuiya",
    "email":"sabit663@gmail.com",
    "password":"12345678",
    "dateOfBirth":"12-12-2000"
}
```



##### I. Example Response: success
```js
{
    "success": true
}
```


***Status Code:*** 201

<br>



##### II. Example Request: Duplicate Email



***Body:***

```js        
{
    "name":"md sabit islam bhuiya",
    "email":"sabit663@gmail.com",
    "password":"12345678",
    "dateOfBirth":"12-12-2000"
}
```



##### II. Example Response: Duplicate Email
```js
{
    "success": false,
    "error": "user exists",
    "data": {}
}
```


***Status Code:*** 409

<br>



##### III. Example Request: Bad Request



***Body:***

```js        
{
    "name":"md sabit islam bhuiya",
    "email":"sabit6635@gmail.com",
    "dateOfBirth":"12-12-2000"
}
```



##### III. Example Response: Bad Request
```js
{
    "success": false,
    "error": "something went wrong",
    "data": {}
}
```


***Status Code:*** 500

<br>



### 11. Reply To A Tweet Or Comment


#### **Api endpoint to reply to a tweet.**


***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: http://localhost:3000/api/reply
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| text | hi there |  |
| image  |  |  |
| parent | 6459ea7ba2930a0311d3b7fe |  |



***More example Requests/Responses:***


##### I. Example Request: Reply



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| text | hi there |  |
| image  |  |  |
| parent | 645a1c42a2930a0311d3 |  |
|  |  |  |



##### I. Example Response: Reply
```js
{
    "success": true,
    "error": null,
    "data": {
        "content": {
            "text": "hi there",
            "image": null
        },
        "likes": [],
        "replies": [],
        "retweets": [],
        "parent": "645a1c42a2930a0311d3ba4b",
        "user": {
            "id": "643657302b30ef35ad11c622",
            "username": "sib.sustswe",
            "name": "Sabit Islam",
            "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
        },
        "type": "reply",
        "totalLikes": 0,
        "totalReplies": 0,
        "totalRetweets": 0,
        "createdAt": "2023-05-09T10:20:57.705Z",
        "updatedAt": "2023-05-09T10:20:57.705Z",
        "id": "645a1e89a2930a0311d3ba5b"
    }
}
```


***Status Code:*** 201

<br>



##### II. Example Request: Wrong tweet id



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| text | hi there |  |
| image  |  |  |
| parent | 645a1c42a2930a0311d3 |  |
|  |  |  |



##### II. Example Response: Wrong tweet id
```js
{
    "success": false,
    "error": "Tweet validation failed",
    "data": {}
}
```


***Status Code:*** 400

<br>



### 12. Retweet A Specific Tweet


#### **Api endpoint to retweet an existing tweet.**


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/retweet
```



***Body:***

```js        
{
    "tweetId": "645a011fa2930a0311d3b812"
}
```



***More example Requests/Responses:***


##### I. Example Request: retweet



***Body:***

```js        
{
    "tweetId": "645a1c42a2930a0311d3ba4b"
}
```



##### I. Example Response: retweet
```js
{
    "success": true,
    "error": null,
    "data": {
        "content": {},
        "likes": [],
        "replies": [],
        "retweets": [],
        "parent": "645a1c42a2930a0311d3ba4b",
        "user": {
            "id": "643657302b30ef35ad11c622",
            "username": "sib.sustswe",
            "name": "Sabit Islam",
            "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
        },
        "type": "retweet",
        "totalLikes": 0,
        "totalReplies": 0,
        "totalRetweets": 0,
        "createdAt": "2023-05-09T10:18:08.951Z",
        "updatedAt": "2023-05-09T10:18:08.951Z",
        "id": "645a1de0a2930a0311d3ba53"
    }
}
```


***Status Code:*** 201

<br>



### 13. Search An User By Name and Email


#### **Api endpoint for searching user.**


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/search
```



***Body:***

```js        
{
    "user":"shawon"
}
```



***More example Requests/Responses:***


##### I. Example Request: search user



***Body:***

```js        
{
    "user":"shawon"
}
```



##### I. Example Response: search user
```js
{
    "success": true,
    "error": null,
    "data": [
        {
            "username": "shawon.shellbeehaken",
            "email": "shawon.shellbeehaken@gmail.com",
            "name": "Shawon",
            "score": 1.85,
            "id": "643e114113dcb145da71e70a"
        },
        {
            "username": "shawon2046",
            "email": "shawon2046@gmail.com",
            "name": "Mohammed Mazhar Ali Shawon",
            "score": 0.625,
            "id": "643cd86513a53c746924c1e6"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 14. Send Message To An User


Api endpoint to send message to a user.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/message
```



***Body:***

```js        
{
    "content":{"text":"hi there"},
    "customId":"0.321",
    "receiver":"6434e87f9f401dcd4e3621ad"
}
```



***More example Requests/Responses:***


##### I. Example Request: message



***Body:***

```js        
{
    "content":{"text":"hi there"},
    "customId":"0.321",
    "receiver":"6434e87f9f401dcd4e3621ad"
}
```



##### I. Example Response: message
```js
{
    "success": true,
    "error": null,
    "data": {
        "message": {
            "content": {
                "text": "hi there"
            },
            "sender": "643657302b30ef35ad11c622",
            "receiver": "6434e87f9f401dcd4e3621ad",
            "senderReact": "none",
            "receiverReact": "none",
            "seen": false,
            "originalMessage": {},
            "createdAt": "2023-05-10T04:33:47.005Z",
            "id": "645b1eabe2f1c7d3e02e425f"
        },
        "customId": "0.321"
    }
}
```


***Status Code:*** 200

<br>



### 15. Update A Tweet


#### **Api endpoint to update an existing tweet in twitter clone app.**


***Endpoint:***

```bash
Method: PATCH
Type: FORMDATA
URL: http://localhost:3000/api/tweet/645a10b3a2930a0311d3b891
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |
| content | hi there |  |



***More example Requests/Responses:***


##### I. Example Request: update tweet



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |
| content | hi there |  |



##### I. Example Response: update tweet
```js
{
    "success": true,
    "error": null,
    "data": {
        "content": {
            "text": "hi there",
            "image": "http://localhost:3000/uploads/875092be6f0732c8b8a7cce17.png"
        },
        "user": {
            "id": "643657302b30ef35ad11c622",
            "username": "sib.sustswe",
            "name": "Sabit Islam",
            "image": "http://localhost:3000/uploads/48a1d8a6c492d7678f62e4d00.jpg"
        },
        "likes": [],
        "replies": [],
        "retweets": [],
        "type": "tweet",
        "totalLikes": 0,
        "totalReplies": 0,
        "totalRetweets": 0,
        "createdAt": "2023-05-09T10:11:14.794Z",
        "updatedAt": "2023-05-09T10:11:14.794Z",
        "id": "645a1c42a2930a0311d3ba4b"
    }
}
```


***Status Code:*** 200

<br>



---
[Back to top](#twitter-clone-project)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2023-05-11 15:18:01 by [docgen](https://github.com/thedevsaddam/docgen)
