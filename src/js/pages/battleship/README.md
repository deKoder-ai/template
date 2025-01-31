10 x 10 grid
x = A - J
y = 1 - 10
// Customisable size?

Ships:
#  Class:      Size:
1: Carrier     5
2: Battleship  4
3: Cruiser     3
4: Submarine   3
5: Destroyer   2

5 boats total
Ships must be vertical or horizontal

- Ship class will create ship objects that include their length, number of times hit and whether or not it has been sunk
- Remember: only need to test an object's public interface. Only methods or properties used outside of the object need unit tests
- Ships should have a hit function that increases the number of hits to the ship
- isSunk() calculates whether a ship has been sunk by comparing its length to the number of hits received

- Gameboard class
- Will place ships at specific coordinates by calling the ship class
- receiveAttack() takes a pair of coordinates, determines whether it is a hit and then either sends the hit to the correct ship or records location of miss
- Will be able to report if all the ships are sunk

- Player class
- Two types of player, real and computer
- Each Player object should contain its own gameboard

