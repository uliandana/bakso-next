# Test Cases
## 1. Pokemon List
No | Test Case | Passed |
--- | ----------- | :-----------: |
1.1 | Render 100 pokemon on first load | - [x] |
1.2 | Infinite scroll until all 1000s pokemon loaded | - [x] |

## 2. Search Pokemon
No | Test Case | Passed |
--- | ----------- | :-----------: |
2.1 | Filter pokemon by substring name or pokedex number | - [x] |
2.2 | Infinite scroll works on filtered pokemon list | - [x] |
2.3 | Infinite scroll works on pokemon list after filter cleared | - [x] |

## 3. Select and Reselect Pokemon
No | Test Case | Passed |
--- | ----------- | :-----------: |
3.1 | Tapping pokemon from list will show pokemon detail | - [x] |
3.2 | Loading the app from the same browser will always be redirected to selected pokemon page | - [x] |
3.3 | Clicking x icon will clear selected pokemon and return to list pokemon |  - [x] |

## 4. Feed and Evolve Pokemon
No | Test Case | Passed |
--- | ----------- | :-----------: |
4.1 | Render all berries | - [x] |
4.2 | Render list and number of available evolutions | - [x] |
4.3 | Feeding berry will increase pokemon weight with no limit | - [x] |
4.4 | Feeding invalid berry will decrease pokemon weight with limit to 0kg | - [x] |
4.5 | Show Evolve button when weight reaches selected evolution weight | - [x] |
4.6 | Evolve button will change current pokemon to selected evolution but keeps its current weight | - [x] |

## 5. Compatibility and Measurements
No | Test Case | List | Search | Select | Feed |
--- | --- | :---: | :---: | :---: | :---: |
5.1 | Works on MacOS: Chrome, Safari, Firefox | - [x] | - [x] | - [x] | - [x] |
5.2 | Works on Windows: Chrome, Edge, Firefox | - [x] | - [x] | - [x] | - [x] |
5.3 | Works on iOS: Chrome, Safari | - [x] | - [x] | - [x] | - [x] |
5.4 | Works on Android: Chrome, default browser | - [x] | - [x] | - [x] | - [x] |
5.5 | Measure load time data and assets | <input type="number" /> | <input type="number" /> | <input type="number" /> | <input type="number" /> |
5.6 | Measure CPU memory to render all 1000 pokemon | <input type="number" /> | <input type="number" /> | <input type="number" /> | <input type="number" /> |
