## Style Guide usage instructions

### What is Style Guide?

Style Guide is a set of [Ant Design components](ant.design/components) styled for each 
[Graphene UI](https://github.com/decentrawise/graphene-ui) theme. <br>
The list of supported components [can be checked here](https://github.com/decentrawise/graphene-ui-style-guide#ant-design-v3-components-support). 

Any documentation about each of supported components can be found in [Ant Design documentation](ant.design/components). 


### Usage of Style Guide in Graphene UI project

To use any already supported component simply import it from `graphene-ui-style-guide` package like:

`import {Button} from ‘graphene-ui-style-guide’`

Documentation about supported props of each component you can find on Ant Design documentation about each component. 
For e.g. all supported props or ways how to use `Button` component you can find there - [https://ant.design/components/button/](https://ant.design/components/button)


### How to add new components to style-guide?

To start to support new components please follow the next steps:
- Create a new directory with component name in the path<br>`app/graphene-ui-style-guide/NewComponent`

- Create `index.js` file inside the recently created directory and put your component code inside this index file
`app/graphene-ui-style-guide/NewComponent/index.js`

- Add export of your component `index.js` file in `app/graphene-ui-style-guide/index.js`


### How to manage styles of style-guide components ?

Configs for all 3 themes are placed inside these files:
- `app/graphene-ui-style-guide/styles/dark/dark-theme.less`
- `app/graphene-ui-style-guide/styles/light/light-theme.less`
- `app/graphene-ui-style-guide/styles/midnight/midnight-theme.less`

Custom css rules placed there:
- `app/graphene-ui-style-guide/styles/basic/theme.less`

Config themes files contains only variables.


### PLEASE FOLLOW THE RULES TO MANAGE STYLES:

- Use variables for any values of properties. Do not put hardcoded values like: `background-color: #000`. 
- Use variables instead: `background-color: @new-component-background-color`
- Keep all 3 themes config files in SYNC. Do not apply styles only for single theme template file. All themes files should be the same. Only variable values should be different
