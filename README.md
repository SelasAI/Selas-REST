# Spawn-REST

A REST API for the Spawn protocol.

## Overview

Spawn-REST is a REST API for the Spawn protocol. It allows you to interact with the Spawn protocol through a REST API. It is built on top of the [Spawn-SDK](@spawn-so/spawn-node) and uses [Firebase Functions](@firebase/functions) to deploy the API. I is licensed under the [MIT License](https://opensource.org/licenses/MIT). The Spawn-REST API is currently in beta and is subject to change, but we will try to keep the changes to a minimum. Please report any issues or bugs you encounter.

## Contributor installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v8.0.0 or higher)
- [Firebase CLI](https://firebase.google.com/docs/cli/) (v6.0.0 or higher)

### Installation

1. Clone the repository

```bash
git clone
```

2. Install the dependencies

```bash
npm install
```

3. Install firebase tools

```
npm install -g firebase-tools 
```

4. Login to firebase

```
firebase login
```

### Test in local

To run the functions locally in the shell use the following command:

```
firebase functions:shell
```

To run the functions locally in the emulator use the following command:

```
firebase emulators:start
```

To run the functions locally in the shell use the following command:

```
functionName.post('').json({"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  params...})
```


### Deploy

Deploy the functions

```
firebase deploy
```


## API

To use this API, you need to have a Spawn account. If you don't have one, you can create one [here](https://spawn.so). Once you have an account, you can create an app and get the app id, key and secret. You can then use the API to interact with the Spawn protocol.

To test if the API is working, you can use the following command:

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/helloWorld \
-H "Content-Type: application/json" \
-d '{}'
```

### Administration of the users

#### Authorizing or denying the access to the services

Using the Spawn-node client, you can manage how your customers can access our services. 

To allow a user to access our services, you first need to create an app user. During the creation, you need to provide an identifier that will be necessary to access to the usage data. It will be refered in this client as an external id. This external id can be an email, a username, a phone number, a crypto wallet address, etc. 

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/createAppUser \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID}'
```

To check if a user is already created, you can use the isUser method. It will return a boolean.
```
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/isUser \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID}'
```


Once a user is created, you can allow or deny the usage of paid services for this user. This is done by handling the tokens of the user. You can create a token for a user by providing the external id of the user.


```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/createToken \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID}'
```

There is no need to store the token in your database. You can retrieve it at any time by providing the external id of the user.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/getAppUserToken \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID}'
```

curl -m 70 -X POST localhost:8081 -H "Content-Type: application/json" -d '{"job_id": '0de6aa8d-7ce5-47ae-82c8-f9cdb428288d'}'

There is no need to give a token for every utilisation. Once a token is created, it remain active until it is deleted. If you need to deny the access to a user, you can delete all the tokens of the user.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/deleteAllTokenOfAppUser \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID}'
```

Moreover, the AI usage of a user is limited by the amount of credit that you give it. You can set the credit of a user by providing the external id of the user and the amount of credit you want to give. This security is mandatory to avoid a user to use all the credit of your app.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/setCredit \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID,
  "amount": CREDIT_AMOUNT}'
```

#### Accessing user usage

As the administror of your application, you can access all the informations that we have on your users.

You can get the credit of a user by providing the external id of the user.
```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/getAppUserCredits \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID}'
```

You can get the history of all the jobs that a user has run on our service.
```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/getAppUserJobHistory \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID,
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID,
  "p_limit": LIMIT,
  "p_offset": OFFSET}'
```

If you want to get the specific result of a job (be it an image or an add-on), you can user the getResult method. You need to provide the job_id of the job you want to get the result of. It will return a json object with the result of the job.
```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/getResult \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID,
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID,
  "job_id": JOB_ID}'
```

As your user will be able to create add-ons, you will have a complete right to access them. All add-ons create by your customers and by you will be accessible by the getAddOnList method. It will return a json object with all the add-ons of your app.
```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/getAddOnList \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET
  [,"app_user_external_id": USER_ID]}'
```

Moreover, you can delete, share or rename any add-on created on your application.
```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/renameAddOn \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "add_on_name": ADD_ON_NAME,
  "new_add_on_name": NEW_ADD_ON_NAME}'

curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/shareAddOn \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET
  "add_on_name": ADD_ON_NAME,
  "app_user_external_id": USER_ID}'

curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/deleteAddOn \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET
  "add_on_name": ADD_ON_NAME}'
```


### Usage of IA services

Even if this the Spawn-node client is created to manage applications and its users, it has all the needed methods for running jobs on the Spawn platform. When running jobs on Spawn-node, you are seen as a super-user and do not have to use tokens or credit.

To know how many workers are active on the Spawn platform, you can use the getCountActiveWorker method. It will return the number of workers for each service.
```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/getCountActiveWorker \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET}'
```

#### Running an image generation job

The following example shows how to run a stable diffusion job with minimal parameters.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/runStableDiffusion \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET
  "prompt": PROMPT
  [, others parameters]}'
```

To get the cost of a job without running it, you can use the costStableDiffusion method. Its syntax is exactly the same as runStableDiffusion.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/costStableDiffusion \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET
  "prompt": PROMPT
  [, others parameters]}'
```

It is possible to specify additional parameters for the jobs. Those parameters are defined in this list :
```js
/**
  * @param prompt - the description of the image to be generated
  * @param negative_prompt - description of the image to be generated, but with negative words like "ugly", "blurry" or "low quality"
  * @param width - the width of the generated image
  * @param height - the height of the generated image
  * @param steps - the number of steps of the StableDiffusion algorithm. The higher the number, the more detailed the image will be. Generally, 30 steps is enough, but you can try more if you want.
  * @param batch_size - the number of images to be generated at each step.
  * @param guidance_scale - the weight of the guidance image in the loss function. Typical values are between 5. and 15. The higher the number, the more the image will look like the prompt. If you go too high, the image will look like the prompt but will be low quality.
  * @param init_image - the url of an initial image to be used by the algorithm. If not provided, random noise will be used. You can start from an existing image and make StableDiffusion refine it. You can specify the skip_steps to choose how much of the image will be refined (0 is like a random initialization, 1. is like a copy of the image).
  * @param mask - the url of a mask image. The mask image must be a black and white image where white pixels are the pixels that will be modified by the algorithm. Black pixels will be kept as they are. If not provided, the whole image will be modified.
  * @param skip_steps - the number of steps to skip at the beginning of the algorithm. If you provide an init_image, you can choose how much of the image will be refined. 0 is like a random initialization, 1. is like a copy of the image.
  * @param seed - the seed of the random number generator. Using twice the same we generate the same image. It can be useful to see the effect of parameters on the image generated. If not provided, a random seed will be used.
  * @param image_format - the format of the generated image. It can be "png" or "jpeg".
  * @param nsfw_filter - if true, the image will be filtered to remove NSFW content. It can be useful if you want to generate images for a public website.
  * @param translate_prompt - if true, the prompt will be translated to English before being used by the algorithm. It can be useful if you want to generate images in a language that is not English.
  */
```

To specify those parameters, you can use the runStableDiffusion method and pass in an object with the parameters you want to change as arguments.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/costStableDiffusion \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET
  "prompt": PROMPT,
  "width": WIDTH,
  "height": HEIGHT,
  "image_format": IMAGE_FORMAT}'
```

More specific at our plateform, you can alter your jobs by using one or multiple add-ons that are have been trained or shared to your application.
```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/costStableDiffusion \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET
  "prompt": PROMPT
  patches: [
    {
      name: PATCH_NAME,
      alpha_text_encoder: ALPHA_TEXT_ENCODER,
      alpha_unet: ALPHA_UNET,
      steps: STEPS,
    },
  ]}'
```

The response object will contain the job_id of the job that was created. You can use this job_id to check the status of the job and to retrieve the results of the job. This result can take a few second to be produced.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/getResult \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID,
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID,
  "job_id": JOB_ID}'
```

#### Running a patch creation job

The following example shows how to run a patch creation job with minimal parameters.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/runPatchTrainer \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID,
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID
  "dataset": DATASET,
  "patch_name": PATCH_NAME}'
```

To get the cost of a job without posting it, you can use the costPatchTrainer method. Its syntax is the same as the runPatchTrainer method.

```bash
curl -m 70 -X POST https://europe-west1-scrypr.cloudfunctions.net/costPatchTrainer \
-H "Content-Type: application/json" \
-d '{"app_id": TEST_APP_ID,
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "app_user_external_id": USER_ID
  "dataset": DATASET,
  "patch_name": PATCH_NAME}'
```

To train a patch, you need a list of images and label that will be used to train the patch. They will alter the stable diffusion model to generate images that are similar to the images you provide. The label is used to describe the images you provide. It can be a sentence or a list of words. It must be a json in this format:

```json
[
      {
        url: "https://img.sanctuary.fr/fiche/origin/78.jpg",
        label: "fcompo style, a group of people standing next to each other, by Otomo Katsuhiro, french comic style, zenescope, complex emotion, cover corp"
      },
      {
        url: "https://ramenparados.com/wp-content/uploads/2020/10/Family-Compo-destacado.jpg",
        label: "fcompo style, a couple sitting on top of a red fire hydrant, a manga drawing, by Yumihiko Amano, shin hanga, city hunter, beautiful anime girl squatting, katsuhiro otomo and junji ito, realistic manga"
      },
      {
        url: "https://www.manga-news.com/public/images/pix/serie/4219/family-compo-visual-4.jpg",
        label:
          "fcompo style, a drawing of a woman bending over on a skateboard, a manga drawing, by Fujishima Takeji, pixiv, shin hanga, wearing a tank top and shorts, early 90s cg, ( ultra realistic ), portrait of mayuri shiina",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBexZRrbQC-wMlw3Y04K9KKPH_Mu0yX5sjrzHjybroJNtYEz-aVusWrPHAMJF1svM71QQ&usqp=CAU",
        label:
          "fcompo style, a drawing of a woman holding a baseball bat, inspired by Kusumi Morikage, pixiv, shin hanga, fully clothed. painting of sexy, あかさたなは on twitter, pin on anime, initial d",
      },
    ]
```