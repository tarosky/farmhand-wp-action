# Farmhand WP

A GitHub action to check if the plugin or theme is up-to-date with the latest WordPress.

WordPress public directory drops plugins not tested with major 3 verison. To maintain your repository fresh and public, check readme.

Tested up to: 6.2

## Usage

Create GitHub action in your repository and run it periodically.

```
name: Latest WP Support

on:
  schedule:
    - cron: "0 2 5 * *" # Every month on the 5th at 2am UTC

jobs:
  is-outdated:
    name: Check if WP version is outdated
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@master

      - name: Check wp version
        uses: tarosky/farmhand-wp-action@v1
        id: wp_version
        with:
          readme: readm.txt # Path to your readme. Default "README.md".

      - name: Update Issue if needed
        if: steps.wp_version.outputs.should_update
        uses: actions-ecosystem/action-create-issue@v1
        with:
          github_token: ${{ secrets.github_token }}
          title: ${{ steps.wp_version.outputs.version }}
          body: |
            ## TODO

            - [ ] Check if plugin works with the latest WP version
            - [ ] Bump "Tested up to" version in README.md

          labels: |
            update
          assignees: |
            user1

```

## License

&copy; 2023 Tarosky

This source code is licensed under MIT.
