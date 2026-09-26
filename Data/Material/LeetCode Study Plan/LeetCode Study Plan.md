
# The Comprehensive LeetCode & Coding Interview Guide

---

## PART 1: THE MINDSET & FRAMEWORK FOR APPROACHING ANY PROBLEM

### The 4-Step Problem-Solving Framework

Before you ever write a line of code, internalize this process. It's what interviewers are actually evaluating.

**Step 1: UNDERSTAND (3–5 minutes)**
- Read the problem **twice**.
- Identify **inputs** and **outputs** explicitly. What type? What size? What range?
- Identify **constraints** — these are massive hints (more on this later).
- Ask clarifying questions (in an interview, ask the interviewer; on LeetCode, check the constraints section):
  - Can the input be empty or null?
  - Are there duplicates?
  - Is the input sorted?
  - Are there negative numbers?
  - What should I return if there's no valid answer?
- Work through the **given examples by hand**. Then create **your own edge cases**.

**Step 2: PLAN (5–10 minutes)**
- Start with the brute-force approach. Always. Say it out loud or think it through.
- Identify the **bottleneck** in your brute force (usually a nested loop, repeated computation, or redundant search).
- Ask: "What information am I recomputing? What can I trade space for to save time?"
- Identify the **pattern** (see Part 2).
- Choose your **data structures and algorithms** (see Parts 3 and 4).
- Walk through your optimized approach with an example **before coding**.

**Step 3: CODE (10–15 minutes)**
- Write clean, readable code.
- Use meaningful variable names.
- Break logic into helper functions if complexity grows.
- Don't optimize prematurely at the syntax level — correctness first.

**Step 4: VERIFY (5 minutes)**
- Trace through your code with the examples.
- Test with edge cases: empty input, single element, all same elements, very large input, negative numbers.
- Check off-by-one errors (loop boundaries, indices).
- Verify return values.

---

### How to Use Constraints as Hints

This is one of the most powerful tricks most people overlook. The constraint on input size (`n`) tells you what time complexity the problem expects:

| Constraint on `n` | Target Complexity | Likely Approach |
|---|---|---|
| `n ≤ 10–15` | O(2^n) or O(n!) | Backtracking, brute-force, bitmask |
| `n ≤ 20–25` | O(2^n) | Bitmask DP, meet in the middle |
| `n ≤ 100` | O(n³) | Triple nested loops, Floyd-Warshall |
| `n ≤ 1,000` | O(n²) | DP with 2D table, nested loops |
| `n ≤ 10,000` | O(n²) borderline | DP, careful nested loops |
| `n ≤ 100,000` | O(n log n) | Sorting + something, binary search, divide & conquer |
| `n ≤ 1,000,000` | O(n) or O(n log n) | Hash maps, two pointers, sliding window, greedy |
| `n ≤ 10^8+` | O(n) or O(log n) | Math, binary search, O(1) trick |

---

## PART 2: PATTERN RECOGNITION — THE 15 CORE PATTERNS

This is the heart of the guide. Most LeetCode problems fall into a set of recognizable patterns. Learning to identify them is the skill.

---

### Pattern 1: Two Pointers

**What it is:** Use two pointers (indices) that move through the data structure, typically from opposite ends or both from the start.

**When to use it — trigger phrases/signals:**
- The input is a **sorted array or linked list**.
- You need to find a **pair** (or triplet) that satisfies a condition (sum, difference).
- You need to compare elements from both ends.
- You need to do something **in-place** with O(1) space.
- "Remove duplicates," "reverse," "palindrome."

**Variants:**
- **Opposite-direction:** One pointer at start, one at end, move inward. (e.g., Two Sum II, Container With Most Water, Valid Palindrome)
- **Same-direction (fast/slow):** Both start at the beginning; one moves faster. (e.g., Remove Duplicates from Sorted Array, Move Zeroes)
- **Fast/slow for cycle detection:** In linked lists (Floyd's Tortoise and Hare). (e.g., Linked List Cycle, Find the Duplicate Number, Happy Number)

**Template (Opposite-direction):**
```python
def two_pointer(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return [left, right]
        elif current < target:
            left += 1
        else:
            right -= 1
    return []
```

**Complexity:** Usually O(n) time, O(1) space.

---

### Pattern 2: Sliding Window

**What it is:** Maintain a "window" (subarray/substring) that expands or contracts as you iterate through the data.

**When to use it — trigger phrases/signals:**
- "Contiguous subarray" or "substring."
- "Longest/shortest" subarray/substring with some condition.
- "Maximum sum subarray of size k."
- You need to track a **running state** over a contiguous segment.
- Keywords: "at most k distinct," "minimum window," "maximum length."

**Variants:**
- **Fixed-size window:** Window size is given (e.g., Maximum Average Subarray I).
- **Variable-size window:** Window grows/shrinks based on a condition (e.g., Longest Substring Without Repeating Characters, Minimum Window Substring).

**Template (Variable-size):**
```python
def sliding_window(s):
    window = {}  # or set, counter, etc.
    left = 0
    best = 0

    for right in range(len(s)):
        # Expand: add s[right] to window state
        window[s[right]] = window.get(s[right], 0) + 1

        # Contract: while window violates the condition
        while window_is_invalid(window):
            # Remove s[left] from window state
            window[s[left]] -= 1
            if window[s[left]] == 0:
                del window[s[left]]
            left += 1

        # Update answer
        best = max(best, right - left + 1)

    return best
```

**Complexity:** O(n) time (each element is added/removed at most once), O(k) space where k is the window state size.

---

### Pattern 3: Binary Search

**What it is:** Repeatedly halve the search space to find a target or boundary.

**When to use it — trigger phrases/signals:**
- Input is **sorted** (or partially sorted, like rotated sorted arrays).
- You need O(log n) time.
- "Find the minimum/maximum that satisfies a condition" → **Binary Search on Answer**.
- "Find the first/last occurrence."
- "Search in rotated sorted array."
- The answer space is **monotonic** — if condition is true for x, it's true for all values above (or below) x.

**Variants:**
- **Classic search:** Find a target value.
- **Boundary search:** Find leftmost/rightmost position where a condition changes (use `bisect_left` / `bisect_right` mental models).
- **Binary search on answer:** The answer itself is searched over a range. (e.g., Koko Eating Bananas, Split Array Largest Sum, Capacity To Ship Packages Within D Days)

**Template (Find leftmost true):**
```python
def binary_search(arr, condition):
    lo, hi = 0, len(arr)  # or min_answer, max_answer
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if condition(mid):
            hi = mid      # mid might be the answer, search left
        else:
            lo = mid + 1  # mid is not valid, search right
    return lo  # first position where condition is True
```

**Key insight:** Always think about what you're searching for and what the **monotonic condition** is. If you can phrase the problem as "find the smallest x such that f(x) is true," and f is monotonic, use binary search.

**Complexity:** O(log n) time.

---

### Pattern 4: Hash Map / Hash Set

**What it is:** Use a hash-based data structure for O(1) lookups, frequency counting, or grouping.

**When to use it — trigger phrases/signals:**
- "Find if a complement/pair exists" → store seen values.
- "Count frequency" of elements.
- "Find duplicates."
- "Group anagrams" or group by some key.
- You need to reduce a nested O(n²) loop to O(n) by replacing the inner search with a lookup.
- "Two Sum" type problems (not sorted).
- "Subarray sum equals k" → prefix sum + hash map.

**Common tricks:**
- **Complement lookup:** For each element, check if `target - element` is in the map.
- **Frequency map:** Count occurrences, then reason about the counts.
- **Index map:** Store the index of each element for quick retrieval.
- **Seen set:** Track what you've already visited/processed.

**Template (Two Sum pattern):**
```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

**Complexity:** O(n) time, O(n) space.

---

### Pattern 5: Prefix Sum

**What it is:** Precompute cumulative sums so that any subarray sum can be calculated in O(1).

**When to use it — trigger phrases/signals:**
- "Subarray sum" problems.
- "Number of subarrays with sum equal to k."
- "Range sum query."
- You need to compute sums of contiguous segments repeatedly.

**Core idea:**
```
prefix[i] = nums[0] + nums[1] + ... + nums[i-1]
sum(nums[l..r]) = prefix[r+1] - prefix[l]
```

**Powerful combo — Prefix Sum + Hash Map:**
```python
def subarray_sum_equals_k(nums, k):
    count = 0
    current_sum = 0
    prefix_counts = {0: 1}  # empty prefix

    for num in nums:
        current_sum += num
        # If (current_sum - k) was a previous prefix sum,
        # then the subarray between them sums to k
        if current_sum - k in prefix_counts:
            count += prefix_counts[current_sum - k]
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1

    return count
```

---

### Pattern 6: Sorting + Greedy

**When to use it — trigger phrases/signals:**
- "Intervals" problems (merge, insert, non-overlapping).
- "Minimum number of something" where local optimal leads to global optimal.
- "Assign tasks/resources."
- "Meeting rooms."
- You can prove that a greedy choice at each step is globally optimal.

**Common greedy strategies:**
- Sort by start time, end time, deadline, ratio, or difference.
- For interval scheduling: sort by **end time**, greedily pick the earliest-ending non-overlapping interval.
- For merge intervals: sort by **start time**, merge overlapping.

**Template (Merge Intervals):**
```python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged
```

---

### Pattern 7: Stacks

**When to use it — trigger phrases/signals:**
- "Valid parentheses," "matching brackets."
- "Next greater/smaller element" → **Monotonic Stack**.
- "Evaluate expression," "decode string."
- Any problem with **nested structure** or where you process things in **LIFO** order.
- "Largest rectangle in histogram," "trapping rain water."
- "Daily temperatures."

**Monotonic Stack Template (Next Greater Element):**
```python
def next_greater_elements(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # stores indices

    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result
```

**Key insight:** A monotonic stack maintains elements in sorted order (either increasing or decreasing). When a new element violates the order, you pop and process.

---

### Pattern 8: Queues and BFS

**When to use it — trigger phrases/signals:**
- "Shortest path" in an **unweighted** graph or grid.
- "Minimum number of steps/moves."
- "Level-order traversal" of a tree.
- "Rotten oranges," "word ladder," "shortest path in a maze."
- Anything involving exploring neighbors layer by layer.

**Template (Grid BFS):**
```python
from collections import deque

def bfs(grid, start):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start[0], start[1], 0)])  # row, col, distance
    visited = {(start[0], start[1])}
    directions = [(0,1), (0,-1), (1,0), (-1,0)]

    while queue:
        r, c, dist = queue.popleft()

        if is_target(r, c):  # your goal condition
            return dist

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols
                and (nr, nc) not in visited
                and grid[nr][nc] != WALL):
                visited.add((nr, nc))
                queue.append((nr, nc, dist + 1))

    return -1  # unreachable
```

**Complexity:** O(V + E) where V = vertices, E = edges.

---

### Pattern 9: DFS and Recursion

**When to use it — trigger phrases/signals:**
- "All paths," "all combinations," "all permutations."
- "Does a path exist?"
- Tree problems (almost all tree problems use DFS).
- "Connected components," "island count."
- "Number of islands," "flood fill."
- Graph exploration where you need to go deep.

**Template (Grid DFS):**
```python
def dfs(grid, r, c, visited):
    if (r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0])
        or (r, c) in visited or grid[r][c] == 0):
        return

    visited.add((r, c))

    for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
        dfs(grid, r + dr, c + dc, visited)
```

**Template (Tree DFS — most common tree recursion):**
```python
def dfs(node):
    if not node:
        return base_case

    left = dfs(node.left)
    right = dfs(node.right)

    # Combine results
    return combine(left, right, node.val)
```

---

### Pattern 10: Backtracking

**What it is:** Build a solution incrementally, abandoning ("pruning") a branch as soon as you determine it can't lead to a valid/optimal solution.

**When to use it — trigger phrases/signals:**
- "Generate all" combinations, permutations, subsets, valid parentheses.
- "N-Queens," "Sudoku solver."
- Constraint satisfaction problems.
- The problem space is exponential but you can prune.
- `n` is small (≤ 15–20).

**Template:**
```python
def backtrack(candidates, path, result, start):
    if is_valid_solution(path):
        result.append(path[:])  # copy!
        return

    for i in range(start, len(candidates)):
        # Pruning conditions
        if not is_valid_choice(candidates[i]):
            continue

        # Choose
        path.append(candidates[i])

        # Explore
        backtrack(candidates, path, result, i + 1)  # i+1 for combinations, i for reuse, 0 for permutations

        # Un-choose (backtrack)
        path.pop()

def solve(candidates):
    result = []
    backtrack(candidates, [], result, 0)
    return result
```

**Key distinction:**
- **Subsets/Combinations:** `start = i + 1` (don't reuse elements, order doesn't matter)
- **Permutations:** Use a `used` set instead of `start`, try all indices
- **Combination with reuse:** `start = i` (same element can be reused)

---

### Pattern 11: Dynamic Programming (DP)

**When to use it — trigger phrases/signals:**
- "Count the number of ways."
- "Minimum/maximum cost/path/sum."
- "Can you reach…?" or "Is it possible?"
- "Longest/shortest subsequence" (not subarray — that's often sliding window).
- The problem has **overlapping subproblems** and **optimal substructure**.
- You can define the answer in terms of answers to smaller versions of the same problem.

**How to approach DP systematically:**

1. **Define the state:** What variables describe a subproblem? `dp[i]`, `dp[i][j]`, `dp[i][j][k]`?
2. **Define the recurrence:** How does `dp[i]` relate to previous states?
3. **Define the base case:** What's the smallest subproblem you can solve directly?
4. **Define the answer:** Which cell in your DP table holds the final answer?
5. **Determine the iteration order:** Make sure you compute dependencies before they're needed.
6. **Optimize space** if possible (often you only need the previous row).

**Common DP Categories:**

**a) 1D DP (Linear)**
- Climbing Stairs, House Robber, Coin Change, Longest Increasing Subsequence
```python
# House Robber
def rob(nums):
    if not nums: return 0
    if len(nums) == 1: return nums[0]
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    return dp[-1]
```

**b) 2D DP (Grid / Two sequences)**
- Unique Paths, Edit Distance, Longest Common Subsequence, Knapsack
```python
# Longest Common Subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
```

**c) Knapsack Variants**
- 0/1 Knapsack: Each item used at most once.
- Unbounded Knapsack: Items can be reused.
- Subset Sum, Partition Equal Subset Sum, Coin Change.

```python
# 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]  # don't take item i
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w - weights[i-1]] + values[i-1])
    return dp[n][capacity]
```

**d) Interval DP**
- Burst Balloons, Matrix Chain Multiplication, Palindrome Partitioning.
- State: `dp[i][j]` = answer for the subproblem from index i to j.

**e) DP on Trees**
- Diameter of Binary Tree, House Robber III.
- DFS + memoization or DFS returning multiple values.

**f) Bitmask DP**
- Traveling Salesman, assigning tasks to people.
- State includes a bitmask representing which items have been used.
- Used when n ≤ 20.

**Top-Down (Memoization) vs. Bottom-Up (Tabulation):**
- **Top-Down:** Write the recursive solution, add a cache (`@lru_cache` or a dictionary). Easier to write, same complexity.
- **Bottom-Up:** Fill a table iteratively. Can be faster in practice (no recursion overhead) and easier to optimize space.

```python
# Top-down example
from functools import lru_cache

def coin_change(coins, amount):
    @lru_cache(maxsize=None)
    def dp(remaining):
        if remaining == 0:
            return 0
        if remaining < 0:
            return float('inf')
        return min(dp(remaining - c) + 1 for c in coins)

    result = dp(amount)
    return result if result != float('inf') else -1
```

---

### Pattern 12: Heap / Priority Queue

**When to use it — trigger phrases/signals:**
- "K-th largest/smallest."
- "Top K frequent elements."
- "Merge K sorted lists."
- "Median from data stream."
- You need to repeatedly extract the min or max efficiently.
- "Schedule tasks by priority."

**Key operations:** Insert O(log n), Extract min/max O(log n), Peek O(1).

**Tricks:**
- **For "K-th largest":** Use a **min-heap of size k**. The top is your answer.
- **For "K-th smallest":** Use a **max-heap of size k**.
- **For running median:** Use **two heaps** — a max-heap for the lower half, a min-heap for the upper half.
- **For "merge K sorted":** Put the first element of each list in a min-heap.

```python
import heapq

# K-th Largest Element
def kth_largest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

# Merge K Sorted Lists
def merge_k_lists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))

    dummy = curr = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next
```

---

### Pattern 13: Graphs — Advanced

Beyond basic BFS/DFS:

**a) Topological Sort (Kahn's Algorithm / DFS-based)**
- **When:** "Course schedule," "build order," "task dependencies," DAGs.
- **Signal:** Directed graph + ordering based on dependencies.

```python
from collections import deque, defaultdict

def topological_sort(num_nodes, edges):
    graph = defaultdict(list)
    in_degree = [0] * num_nodes

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    queue = deque([i for i in range(num_nodes) if in_degree[i] == 0])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == num_nodes else []  # empty = cycle exists
```

**b) Union-Find (Disjoint Set Union)**
- **When:** "Connected components," "redundant connection," "accounts merge," dynamic connectivity.
- **Signal:** Grouping elements, checking if two elements are in the same group, merging groups.

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        self.components -= 1
        return True
```

**c) Dijkstra's Algorithm**
- **When:** Shortest path in a **weighted graph with non-negative weights**.
- **Signal:** "Cheapest flights," "network delay time," "shortest path" with weights.

```python
import heapq
from collections import defaultdict

def dijkstra(graph, start, n):
    dist = [float('inf')] * n
    dist[start] = 0
    heap = [(0, start)]

    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(heap, (dist[v], v))

    return dist
```

**d) Bellman-Ford**
- **When:** Shortest path with **negative weights** or when you need **at most K edges** (e.g., Cheapest Flights Within K Stops).

---

### Pattern 14: Trie (Prefix Tree)

**When to use it — trigger phrases/signals:**
- "Prefix search," "autocomplete."
- "Word search" in a board with a dictionary.
- "Implement a dictionary" with prefix operations.
- When you need to efficiently store and search strings by prefix.

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._find(prefix) is not None

    def _find(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
```

---

### Pattern 15: Bit Manipulation

**When to use it — trigger phrases/signals:**
- "Single number" (find the element that appears once).
- "Power of two."
- "Counting bits."
- "Subsets" (bitmask enumeration).
- Space-constrained problems requiring O(1) space.

**Essential operations:**
```python
# Check if bit i is set
(n >> i) & 1

# Set bit i
n | (1 << i)

# Clear bit i
n & ~(1 << i)

# Toggle bit i
n ^ (1 << i)

# Check if power of 2
n & (n - 1) == 0

# XOR trick: a ^ a = 0, a ^ 0 = a
# Find single number (all others appear twice):
result = 0
for num in nums:
    result ^= num

# Count set bits
bin(n).count('1')

# Enumerate all subsets of a set of n elements
for mask in range(1 << n):
    subset = [i for i in range(n) if mask & (1 << i)]
```

---

## PART 3: DATA STRUCTURE SELECTION GUIDE

**"I need fast lookups by key"** → Hash Map / Hash Set

**"I need to maintain sorted order with fast insert/delete/search"** → Balanced BST (or SortedList in Python, TreeMap in Java)

**"I need fast min or max extraction"** → Heap (Priority Queue)

**"I need FIFO processing"** → Queue (deque)

**"I need LIFO processing or matching nested structures"** → Stack

**"I need to efficiently merge groups or check connectivity"** → Union-Find

**"I need prefix-based string operations"** → Trie

**"I need fast range sum queries + point updates"** → Binary Indexed Tree (Fenwick Tree) or Segment Tree

**"I need to represent relationships/connections"** → Graph (adjacency list)

**"I need to process levels or find shortest unweighted path"** → BFS with Queue

---

## PART 4: ALGORITHM COMPLEXITY CHEAT SHEET

| Algorithm | Time | Space | Notes |
|---|---|---|---|
| Binary Search | O(log n) | O(1) | Sorted input |
| Two Pointers | O(n) | O(1) | Sorted or linear scan |
| Sliding Window | O(n) | O(k) | Contiguous subarrays |
| Hash Map lookup | O(1) avg | O(n) | Amortized |
| BFS/DFS | O(V + E) | O(V) | Graph traversal |
| Sorting | O(n log n) | O(n) | Python Timsort |
| Heap push/pop | O(log n) | O(n) | Priority queue ops |
| Union-Find | O(α(n)) ≈ O(1) | O(n) | With path compression + rank |
| Dijkstra | O(E log V) | O(V) | With min-heap |
| Topological Sort | O(V + E) | O(V) | DAG only |
| DP | Varies | Varies | Depends on state space |
| Backtracking | O(2^n) or O(n!) | O(n) | Exponential worst case |

---

## PART 5: COMMON TRICKS AND TECHNIQUES

### 1. The "Sort First" Trick
Many problems become dramatically easier after sorting. If the problem doesn't require preserving order, try sorting first. (Three Sum, Merge Intervals, Meeting Rooms)

### 2. Dummy Nodes (Linked Lists)
Create a `dummy = ListNode(0)` and point it before the head. Build your result off `dummy.next`. Eliminates edge cases with head manipulation.

```python
dummy = ListNode(0)
dummy.next = head
# ... manipulate ...
return dummy.next
```

### 3. In-Place Reversal of Linked List
```python
def reverse(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
```

### 4. Using `float('inf')` and `float('-inf')`
Initialize min-tracking with `float('inf')` and max-tracking with `float('-inf')`.

### 5. Modular Arithmetic
For "count the number of ways" problems, the answer is often `mod 10^9 + 7`. Apply mod at every addition/multiplication step.

### 6. The "Work Backward" Trick
Some problems are easier if you process from the end. (e.g., Gas Station, certain stack problems)

### 7. Coordinate Compression
When values are huge but the count is small, map them to a compact range.

### 8. "Math" Patterns to Know
- **GCD / LCM:** `math.gcd(a, b)`, `lcm = a * b // gcd(a, b)`
- **Modular exponentiation:** `pow(base, exp, mod)`
- **Sum of 1..n:** `n * (n + 1) // 2`
- **Check if number is prime:** Trial division up to √n
- **Pigeonhole principle:** n+1 items in n boxes → at least one box has 2+

### 9. String Building
In Python, use a list and `''.join()` instead of string concatenation in loops (O(n) vs O(n²)).

### 10. `defaultdict` and `Counter`
```python
from collections import defaultdict, Counter

freq = Counter(nums)          # instant frequency map
graph = defaultdict(list)     # no KeyError for new nodes
```

---

## PART 6: THE DECISION TREE — BRINGING IT ALL TOGETHER

When you see a new problem, ask yourself these questions in order:

```
1. Is it asking about a SORTED array?
   ├── Need to find a pair/target? → TWO POINTERS
   ├── Need to find a position/boundary? → BINARY SEARCH
   └── Need to search in rotated array? → MODIFIED BINARY SEARCH

2. Is it asking about SUBARRAYS or SUBSTRINGS (contiguous)?
   ├── Fixed length? → SLIDING WINDOW (fixed)
   ├── Variable length with condition? → SLIDING WINDOW (variable)
   └── Sum of subarray equals k? → PREFIX SUM + HASH MAP

3. Is it asking about SUBSEQUENCES (not contiguous)?
   └── → Usually DP

4. Is it a TREE problem?
   ├── Level-order traversal? → BFS
   ├── Path/depth/height? → DFS (recursion)
   └── Lowest common ancestor? → DFS with specific logic

5. Is it a GRAPH problem?
   ├── Shortest path (unweighted)? → BFS
   ├── Shortest path (weighted)? → DIJKSTRA
   ├── Dependencies/ordering? → TOPOLOGICAL SORT
   ├── Connected components? → DFS/BFS or UNION-FIND
   └── Cycle detection? → DFS with coloring / TOPOLOGICAL SORT

6. Is it asking for ALL combinations/permutations/subsets?
   └── → BACKTRACKING

7. Is it asking "how many ways" or "min/max cost"?
   └── → DP (define state, recurrence, base case)

8. Does it involve INTERVALS?
   └── Sort by start/end → GREEDY / SWEEP LINE

9. Does it involve K-th element or top K?
   └── → HEAP

10. Does it involve matching/nesting/nearest greater?
    └── → STACK (possibly monotonic)

11. Is the input size very small (n ≤ 15-20)?
    └── → BITMASK / BRUTE FORCE / BACKTRACKING
```

---

## PART 7: STUDY PLAN RECOMMENDATION

### Phase 1: Foundations (Week 1–2)
- Arrays, Strings, Hash Maps
- Two Pointers, Sliding Window
- Basic sorting problems
- ~30 easy problems

### Phase 2: Core Patterns (Week 3–5)
- Binary Search (all variants)
- Stacks (including monotonic)
- Linked Lists
- Trees (DFS, BFS, all traversals)
- Basic Graphs (BFS, DFS, connected components)
- ~40 easy/medium problems

### Phase 3: Advanced Patterns (Week 6–8)
- Dynamic Programming (1D → 2D → knapsack)
- Backtracking
- Heaps
- Advanced Graphs (Dijkstra, Topological Sort, Union-Find)
- ~40 medium problems

### Phase 4: Mastery (Week 9–10)
- Hard problems
- Tries, Segment Trees
- Bitmask DP
- Combination patterns (binary search + DP, etc.)
- ~20 medium/hard problems

### Practice Tips
- **Don't spend more than 45 minutes** on a problem before looking at hints/solutions.
- After seeing a solution, **close it and re-implement from memory**.
- **Revisit problems** you struggled with after 3 days, then after 1 week (spaced repetition).
- **Explain your approach out loud** — this is what the interview is.
- Focus on **patterns, not individual problems**. Once you solve 3–4 problems of a pattern, you should recognize it instantly.

---
