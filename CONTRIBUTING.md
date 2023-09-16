
# Contributing to CasuaFolio: rules & guides

Hello and thank you for your interest in contributing to CasuaFolio!
Please go through the following guidelines to ensure a smooth contribution process.

## Prerequisites

- **Read & Learn**: Make sure you've read the README and the setup guides for a basic understanding of how CasuaFolio works. Remember, the intended audience are non-programmers!

## Before You Submit a PR

1. **Run the Build**: Before pushing your changes, make sure to run the following command:

    ```bash
    npm run build
    ```

2. **Check the Output**: Open `build/index.html` in your web browser to confirm that the program is working as intended.

3. **Test Thoroughly**: Thoroughly test the changes you've made to ensure everything is functioning correctly.

## Submitting a Pull Request
**Once you're confident that everything is in order:** 
- Go ahead and submit a pull request. 
- Provide a clear description of the changes you've made 
- Link any relevant issues.



> If you're new to contributing to open-source projects on GitHub, these tutorials may be helpful:
> - [Finding Ways to Contribute to Open Source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
> - [Contributing to Projects](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
> - You could also see the guide below👇👇

## Step-by-Step Guide for Your First Contribution:

0. **Give the project a Star ⭐ on GitHub** 😉

1. **Fork the Repo**: Hit that 'Fork' button on the top-right corner of the repo's GitHub page. This gives you your own copy under your GitHub account.

2. **Clone Your Fork**: Open your terminal and run the following to bring that fork right onto your machine.
    ```bash
    git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
    ```

3. **Set Upstream Remote**: Next, let's link back to the original repo. This way, you can pull any updates easily. 
    ```bash
    git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPO.git
    ```

4. **Create a New Branch**: Don't code on the main branch; that's messy. Instead, make a new branch for your awesome feature.
    ```bash
    git checkout -b my-cool-feature
    ```

5. **Jump into the `src` Folder**: The code lives in the `src` folder since this is an npm-based project. Open it up and start coding!

6. **Commit Your Work**: Done coding? Awesome. Let's save these changes.
    ```bash
    git add .
    git commit -m "Implemented image path retriever"
    ```

7. **Fetch and Merge**: Just to make sure you're up-to-date with the original repo, fetch and merge any new updates.
    ```bash
    git fetch upstream
    git merge upstream/main
    ```

8. **Push to Your GitHub**: Your code is ready for the world to see. Push it to your fork.
    ```bash
    git push origin my-cool-feature
    ```

9. **Create a Pull Request**: Back on GitHub, go to 'Pull Requests' in the original repo and click 'New Pull Request'. Pick your fork and the new branch as the source.

10. **Tell Us What You Did**: Write a nice comment explaining your feature. When you're ready, hit 'Create Pull Request'.

11. **Wait a Bit**: Someone will review your code and might ask for some changes. Keep an eye on your PR for any comments.

12. **Make Necessary Changes**: You might be asked to make some necessary changes, be patient!

13. **High-Five Yourself**: Once your PR gets the green light, it'll be merged and you've officially contributed. Nice!


