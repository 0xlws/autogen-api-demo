# README

API thanks to:
https://github.com/bonadio/autogenwebdemo.git

## Instructions

1. Clone the repository:

   ```
   git clone <your-repo-url>
   ```

2. Install the required packages:

   - Using Yarn:

     ```
     yarn setup
     ```

   - Using npm:
     ```
     npm install
     ```

3. Inside `./backend/` rename the file "OAI_CONFIG_LIST.example" to "OAI_CONFIG_LIST" (remove the ".example" extension)

   ```
   {
     "model": "gpt-3.5-turbo",
     "api_key": "<YOUR API KEY>"
   }
   ```

   Replace `<YOUR API KEY>` with your actual API key.

4. Run the application locally:

   - Using Yarn:

     ```
     yarn dev
     ```

   - Using npm:
     ```
     npm run dev
     ```
