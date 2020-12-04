if [ -d .git ]; then 
    husky install
else
    echo 'husky will not be installed because no .git folder was found'
fi