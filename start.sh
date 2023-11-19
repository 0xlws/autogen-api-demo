#! /bin/bash
cd backend && source venv/bin/activate && python3 main.py\
&\
cd ui/nextjs && yarn dev\
&\
cd ui/electron && npm start