class Node:
   class Node:
    def __init__(self, state, parent, action):
        self.state = state     # Yeh ek tuple hai (row, col), jaise (1, 2)
        self.parent = parent   # Kis node se yahan aaye, uska reference
        self.action = action   # Kaunsi direction se aaye? 'UP', 'DOWN', etc.
# Samajh lo: Maze ke har ek step ko ek Node object ke through represent kiya gaya hai.
# Jab bhi hum kisi naye step par jaate hain, hum note karte hain:

# Wo step (kahan gaya — state)

# Kahan se aaye — parent

# Kaise aaye — action (direction)




class StackFrontier:
    def __init__(self):
        self.frontier = []

    def add(self, node):
        self.frontier.append(node)

    def contains_state(self, state):
        return any(node.state == state for node in self.frontier)

    def empty(self):
        return len(self.frontier) == 0

    def remove(self):
        if self.empty():
            raise Exception("Frontier is empty")
        else:
            return self.frontier.pop() 
        
       

# frontier ek list hai jisme woh steps (nodes) hain jo hum explore karne wale hain.

# Stack jaisa kaam karta hai: jo last mein gaya, woh pehle niklega.

# DFS mein yahi hota hai — pehle sabse deep (last) step try karte hain.

class Maze:
    def __init__(self, filename):
      
        with open(filename) as f:
            contents = f.read()

            # Maze text file read kar raha hai.

      
        if contents.count("A") != 1:
            raise Exception("Maze must have exactly one start point 'A'")
        if contents.count("B") != 1:
            raise Exception("Maze must have exactly one goal point 'B'")
        
        # Maze file mein ek hi A (start) aur ek hi B (goal) hona chahiye.

       
        self.height = len(contents.splitlines())
        self.width = max(len(line) for line in contents.splitlines())

        self.walls = []
        for i, line in enumerate(contents.splitlines()):
            row = []
            for j, char in enumerate(line):
                if char == "A":
                    self.start = (i, j)
                    row.append(False)
                elif char == "B":
                    self.goal = (i, j)
                    row.append(False)
                elif char == " ":
                    row.append(False)
                else:
                    row.append(True)
            self.walls.append(row)

#             Har character ko dekh kar:

# Wall hai toh True

# Open path hai toh False

# Start/Goal ko bhi note karta hai

    def neighbors(self, state):
        row, col = state
        candidates = [
            ("UP", (row - 1, col)),
            ("DOWN", (row + 1, col)),
            ("LEFT", (row, col - 1)),
            ("RIGHT", (row, col + 1))
        ]

#         Kisi bhi point (row, col) ke 4 possible neighbors (upar, neeche, left, right) check karta hai.

# Agar woh wall nahi hai, toh usay list mein add karta hai.


        result = []
        for action, (r, c) in candidates:
            if 0 <= r < self.height and 0 <= c < self.width and not self.walls[r][c]:
                result.append((action, (r, c)))
        return result
    
# Kisi bhi point (row, col) ke 4 possible neighbors (upar, neeche, left, right) check karta hai.

# Agar woh wall nahi hai, toh usay list mein add karta hai.

  

    def solve(self):
        start = Node(state=self.start, parent=None, action=None)
        frontier = StackFrontier()
        frontier.add(start)
   # Maze ka starting point ek node ke form mein banata hai.

    # Usay frontier mein daalta hai (DFS ke liye)

        explored = set()

        # Yeh woh steps hain jo hum pehle se dekh chuke hain.

        while True:
            if frontier.empty():
                raise Exception("No solution")
            
            # Jab tak koi path milta nahi, ya maze khatam nahi hota, loop chalta hai.

            node = frontier.remove()

            # Frontier se ek step uthata hai (stack ka last wala — DFS)

            if node.state == self.goal:
                # Agar woh goal pe aa gaya, toh path reverse karke store karta hai:
                actions = []
                cells = []
                while node.parent is not None:
                    actions.append(node.action)
                    cells.append(node.state)
                    node = node.parent
                actions.reverse()
                cells.reverse()
                self.solution = (actions, cells)
                return
            
#             Yeh loop parent parent karte hue start se goal tak ka pura path banata hai.

# Reverse karta hai kyunki hum goal se start tak backtrack kar rahe hain.

            explored.add(node.state)

            for action, state in self.neighbors(node.state):
                if not frontier.contains_state(state) and state not in explored:
                    child = Node(state=state, parent=node, action=action)
                    frontier.add(child)

#                     Har valid neighbor ke liye:

# Agar wo already explore nahi hua

# Toh ek naya node banao

# Usay frontier mein daal do (stack mein)

    def print(self):
       
        pass


if __name__ == "__main__":
    m = Maze("maze.txt")
    m.solve()
    print("Solution:")
    print(m.solution)

#     Maze file ko load karta hai

# solve() call karke solution nikaalta hai

# Fir actions aur cells (solution path) print karta hai



