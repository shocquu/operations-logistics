const ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/shocquu/operations-logistics',
        user: {
            name: 'shocquu',
            email: 'mario123.al@gmail.com',
        },
    },
    () => {
        console.log('Deploy Complete!');
    }
);
