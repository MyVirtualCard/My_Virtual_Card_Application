# echo "Switching to branch master"
# git checkout master

# echo "Building app..."
# npm run build
# echo "Deploying files to server..."
# scp -r dist/* root@143.110.186.19:/var/www/myvirtualcard.in/

# echo "Done!"


# Variables
REMOTE_USER="root"
REMOTE_HOST="143.110.186.19"
REMOTE_DIR="/var/www/myvirtualcard.in/html"
BUILD_DIR="./dist"  # Adjust this path based on your Vite build output directory
# Full path to rsync executable
RSYNC="/usr/bin/rsync"
# Build the React app with Vite
echo "Building React app with Vite..."
npm run build

# Transfer build files to remote server
echo "Deploying build to remote server..."
scp -r $BUILD_DIR/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR
# $RSYNC -avz -e ssh --delete $BUILD_DIR/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# Optional: Restart server or application
# Example: Restarting a Node.js server
# ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_DIR && pm2 restart my-app"

echo "Deployment complete."