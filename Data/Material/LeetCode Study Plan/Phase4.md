# Phase 4: Mastery (Weeks 9–10)

## The Goal

Phases 1–3 gave you the tools to solve the vast majority of interview problems. Phase 4 is about **mastery** — tackling hard problems, learning specialized data structures (Tries, Segment Trees), mastering bitmask DP, recognizing **combination patterns** (where two or more techniques merge), and developing the speed and confidence to handle anything an interviewer throws at you. This phase separates "good" from "exceptional."

---

---

## Topic 1: Tries (Prefix Trees)

### Why This Matters

Tries are a specialized tree structure for storing and searching strings by prefix. They appear in autocomplete systems, spell checkers, IP routing, and a specific class of interview problems that can't be efficiently solved with hash maps alone — particularly when you need prefix-based operations or when you're searching a dictionary against a grid.

### Core Concepts to Master

**1. Structure:** Each node represents a character. A path from root to a node spells a prefix. Nodes marked as "end" represent complete words.

**2. Operations and complexities:**

| Operation | Time | Comparison with Hash Set |
|---|---|---|
| Insert word | O(L) | Same |
| Search word | O(L) | Same |
| Search prefix | O(L) | Hash set can't do this efficiently |
| Delete word | O(L) | Same |
| Autocomplete | O(L + results) | Hash set can't do this |

Where L = length of the word/prefix.

**3. When to use a Trie vs a Hash Set:**
- Need **prefix matching**? → Trie
- Need **wildcard matching** (e.g., `.` matches any char)? → Trie with DFS
- Need to **search a dictionary against a grid**? → Trie (Word Search II)
- Only need **exact match**? → Hash Set is simpler

**4. Visual:**
```
Words: ["apple", "app", "ape", "bat"]

         root
        /    \
       a      b
       |      |
       p      a
      / \     |
     p   e*   t*
     |
     l
     |
     e*

* = isEnd (complete word)
```

### Trie Implementation

```typescript
class TrieNode {
    children: Map<string, TrieNode>;
    isEnd: boolean;

    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;

        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }

        node.isEnd = true;
    }

    search(word: string): boolean {
        const node = this.findNode(word);
        return node !== null && node.isEnd;
    }

    startsWith(prefix: string): boolean {
        return this.findNode(prefix) !== null;
    }

    private findNode(prefix: string): TrieNode | null {
        let node = this.root;

        for (const char of prefix) {
            if (!node.children.has(char)) {
                return null;
            }
            node = node.children.get(char)!;
        }

        return node;
    }
}
```

---

### Problem 1.1: Implement Trie (Prefix Tree)
**LeetCode #208 — Medium**

> Implement a trie with `insert`, `search`, and `startsWith`.

This is the implementation above. Make sure you can write it from scratch without hesitation.

```typescript
// Usage:
const trie = new Trie();
trie.insert("apple");
trie.search("apple");     // true
trie.search("app");        // false (not a complete word)
trie.startsWith("app");   // true (prefix exists)
trie.insert("app");
trie.search("app");        // true (now it's a complete word)
```

**Dry run of insert("apple"):**
```
root → 'a' (create) → 'p' (create) → 'p' (create) → 'l' (create) → 'e' (create, isEnd=true)
```

**Dry run of search("app"):**
```
root → 'a' (found) → 'p' (found) → 'p' (found) → isEnd? false → return false
```

---

### Problem 1.2: Design Add and Search Words Data Structure
**LeetCode #211 — Medium**

> Design a data structure that supports adding words and searching with `.` as a wildcard (matches any single character).

**Why this problem:** Introduces DFS within a Trie — the key technique for wildcard/pattern matching.

```typescript
class WordDictionary {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        return this.dfs(word, 0, this.root);
    }

    private dfs(word: string, index: number, node: TrieNode): boolean {
        // Base case: we've matched all characters
        if (index === word.length) {
            return node.isEnd;
        }

        const char = word[index];

        if (char === '.') {
            // Wildcard: try ALL children
            for (const child of node.children.values()) {
                if (this.dfs(word, index + 1, child)) {
                    return true;
                }
            }
            return false;
        } else {
            // Regular character: follow the specific child
            if (!node.children.has(char)) return false;
            return this.dfs(word, index + 1, node.children.get(char)!);
        }
    }
}
```

**Dry run:**
```
addWord("bad"), addWord("dad"), addWord("mad")

search("pad") → root→'p'? No → false
search("bad") → root→'b'→'a'→'d'(isEnd=true) → true
search(".ad") → '.' matches any → try 'b': 'b'→'a'→'d' ✓ → true
search("b..") → 'b'→'.' try 'a': 'a'→'.' try 'd': 'd'(isEnd=true) ✓ → true
```

---

### Problem 1.3: Word Search II
**LeetCode #212 — Hard**

> Given a 2D board and a list of words, find all words that can be formed by adjacent cells (horizontal/vertical). Each cell used at most once per word.

**Why this problem:** One of the most important hard problems. Combines **Trie + Backtracking on a grid**. Without a Trie, you'd run Word Search I for each word (O(words × grid × 4^L)). With a Trie, you search for all words simultaneously.

**Key insight:** Build a Trie from the word list. Then DFS from every cell in the grid, following the Trie. If you reach a node that's not in the Trie, prune immediately (no word starts with this prefix).

```typescript
class TrieNodeWithWord {
    children: Map<string, TrieNodeWithWord>;
    word: string | null; // store the complete word at end nodes

    constructor() {
        this.children = new Map();
        this.word = null;
    }
}

function findWords(board: string[][], words: string[]): string[] {
    // Step 1: Build Trie from all words
    const root = new TrieNodeWithWord();

    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNodeWithWord());
            }
            node = node.children.get(char)!;
        }
        node.word = word; // mark the complete word
    }

    // Step 2: DFS from every cell
    const rows = board.length;
    const cols = board[0].length;
    const result: string[] = [];
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(r: number, c: number, node: TrieNodeWithWord): void {
        // Boundary check
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;

        const char = board[r][c];

        // If cell is visited or character not in Trie → prune
        if (char === '#' || !node.children.has(char)) return;

        const nextNode = node.children.get(char)!;

        // If we've found a complete word
        if (nextNode.word !== null) {
            result.push(nextNode.word);
            nextNode.word = null; // avoid duplicate results
        }

        // Mark as visited
        board[r][c] = '#';

        // Explore all 4 directions
        for (const [dr, dc] of directions) {
            dfs(r + dr, c + dc, nextNode);
        }

        // Restore (backtrack)
        board[r][c] = char;

        // OPTIMIZATION: prune empty branches from the Trie
        // If this node has no more children, remove it from parent
        if (nextNode.children.size === 0) {
            node.children.delete(char);
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dfs(r, c, root);
        }
    }

    return result;
}
```

**The Trie pruning optimization:**
After finding a word (or exhausting all possibilities from a node), if a Trie node has no remaining children, we delete it. This progressively shrinks the Trie as words are found, making future searches faster. Without this, the solution may TLE on large inputs.

**Visual of simultaneous search:**
```
Board:              Trie (words: ["oath", "oat", "eat"]):
o a a n                 root
e t a e                /    \
i h k r               o      e
i f l v              /        \
                    a           a
                   /              \
                  t*               t*
                  |
                  h*

DFS from (0,0)='o':
  → (0,1)='a' → (1,1)='t' → found "oat"!
                           → (2,1)='h' → found "oath"!
  
DFS from (1,0)='e':
  → (1,1)='a'... 'a' not child of 'e' in Trie. Wait—
  Actually: root→'e'→'a'→'t' → found "eat"!
```

---

### Problem 1.4: Search Suggestions System
**LeetCode #1268 — Medium**

> Given products and a search word, after each character typed, suggest up to 3 lexicographically smallest products that match the prefix.

```typescript
function suggestedProducts(
    products: string[],
    searchWord: string
): string[][] {
    // Sort products lexicographically
    products.sort();

    const result: string[][] = [];
    let prefix = '';

    for (const char of searchWord) {
        prefix += char;
        const suggestions: string[] = [];

        // Binary search for the leftmost product with this prefix
        let lo = 0;
        let hi = products.length;

        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (products[mid] < prefix) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }

        // Collect up to 3 products that start with prefix
        for (let i = lo; i < Math.min(lo + 3, products.length); i++) {
            if (products[i].startsWith(prefix)) {
                suggestions.push(products[i]);
            } else {
                break;
            }
        }

        result.push(suggestions);
    }

    return result;
}

// Alternative: Trie-based approach
function suggestedProductsTrie(
    products: string[],
    searchWord: string
): string[][] {
    products.sort();

    // Build Trie, storing up to 3 suggestions at each node
    const root = new TrieNodeSuggestions();

    for (const product of products) {
        let node = root;
        for (const char of product) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNodeSuggestions());
            }
            node = node.children.get(char)!;
            // Since products are sorted, first 3 reaching this node
            // are the lexicographically smallest
            if (node.suggestions.length < 3) {
                node.suggestions.push(product);
            }
        }
    }

    // Walk the Trie with searchWord
    const result: string[][] = [];
    let node: TrieNodeSuggestions | null = root;

    for (const char of searchWord) {
        if (node !== null && node.children.has(char)) {
            node = node.children.get(char)!;
            result.push(node.suggestions);
        } else {
            node = null;
            result.push([]);
        }
    }

    return result;
}

class TrieNodeSuggestions {
    children = new Map<string, TrieNodeSuggestions>();
    suggestions: string[] = [];
}
```

---

### More Trie Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 14 | Longest Common Prefix | Can solve with Trie (though simpler without) |
| 648 | Replace Words | Trie prefix lookup |
| 677 | Map Sum Pairs | Trie with values |
| 720 | Longest Word in Dictionary | Trie + BFS/DFS for buildable words |
| 1032 | Stream of Characters | Trie searched in reverse |

---

---

## Topic 2: Bit Manipulation

### Why This Matters

Bit manipulation provides elegant O(1)-space solutions to problems that seem to require extra data structures. It also enables **bitmask DP** — a technique for solving combinatorial problems on small sets (n ≤ 20). Many interviewers consider bit manipulation a test of CS fundamentals.

### Core Concepts to Master

**1. Essential operations:**
```typescript
// Basic operations
a & b     // AND — both bits must be 1
a | b     // OR — either bit is 1
a ^ b     // XOR — bits differ
~a        // NOT — flip all bits
a << n    // Left shift — multiply by 2^n
a >> n    // Right shift — divide by 2^n (sign-preserving)
a >>> n   // Unsigned right shift

// Common patterns
n & 1              // Check if n is odd
n & (n - 1)        // Remove the lowest set bit
n & (-n)           // Isolate the lowest set bit
(n >> i) & 1       // Check if bit i is set
n | (1 << i)       // Set bit i
n & ~(1 << i)      // Clear bit i
n ^ (1 << i)       // Toggle bit i
```

**2. XOR properties — the most useful for interviews:**
```
a ^ a = 0          // anything XOR itself is 0
a ^ 0 = a          // anything XOR 0 is itself
a ^ b ^ a = b      // XOR is its own inverse
XOR is commutative and associative
```

**3. Power of 2 check:**
```typescript
// n is a power of 2 if and only if it has exactly one set bit
function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}
```

**4. Count set bits (Hamming weight):**
```typescript
function countBits(n: number): number {
    let count = 0;
    while (n > 0) {
        n &= (n - 1); // remove lowest set bit
        count++;
    }
    return count;
}
```

---

### Problem 2.1: Single Number
**LeetCode #136 — Easy**

> Every element appears twice except one. Find the single one. O(1) space.

**Why this problem:** The purest XOR application.

```typescript
function singleNumber(nums: number[]): number {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}
// Why: a ^ a = 0, so all pairs cancel. 0 ^ single = single.
```

---

### Problem 2.2: Number of 1 Bits
**LeetCode #191 — Easy**

> Count the number of set bits in an integer.

```typescript
function hammingWeight(n: number): number {
    let count = 0;
    while (n !== 0) {
        n &= (n - 1); // clear the lowest set bit
        count++;
    }
    return count;
}
```

**Why `n & (n - 1)` clears the lowest set bit:**
```
n     = 101100
n-1   = 101011  (borrows from the lowest 1, flipping it and all lower bits)
n&n-1 = 101000  (lowest set bit is gone)
```

---

### Problem 2.3: Counting Bits
**LeetCode #338 — Easy**

> For every number from 0 to n, count the number of 1 bits. Return as an array.

**Why this problem:** Introduces DP with bit manipulation.

```typescript
function countBits(n: number): number[] {
    const result = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        // dp[i] = dp[i >> 1] + (i & 1)
        // i >> 1 removes the last bit; i & 1 checks if last bit is 1
        result[i] = result[i >> 1] + (i & 1);
    }

    return result;
}

// Alternative using n & (n-1):
// result[i] = result[i & (i-1)] + 1
// i & (i-1) removes the lowest set bit, so it has exactly one fewer 1-bit
```

**Dry run:**
```
i=0: result[0] = 0                          binary: 0
i=1: result[0] + (1&1) = 0+1 = 1            binary: 1
i=2: result[1] + (2&1) = 1+0 = 1            binary: 10
i=3: result[1] + (3&1) = 1+1 = 2            binary: 11
i=4: result[2] + (4&1) = 1+0 = 1            binary: 100
i=5: result[2] + (5&1) = 1+1 = 2            binary: 101

result = [0, 1, 1, 2, 1, 2] ✓
```

---

### Problem 2.4: Reverse Bits
**LeetCode #190 — Easy**

> Reverse the bits of a 32-bit unsigned integer.

```typescript
function reverseBits(n: number): number {
    let result = 0;

    for (let i = 0; i < 32; i++) {
        // Extract the last bit of n
        const bit = n & 1;

        // Shift result left and add the bit
        result = (result << 1) | bit;

        // Shift n right to process next bit
        n >>>= 1; // unsigned right shift
    }

    // Convert to unsigned 32-bit integer
    return result >>> 0;
}
```

---

### Problem 2.5: Missing Number
**LeetCode #268 — Easy**

> Given an array containing n distinct numbers from 0 to n, find the missing one.

```typescript
// XOR approach: XOR all numbers 0..n with all array elements
// Duplicates cancel, leaving the missing number
function missingNumber(nums: number[]): number {
    let result = nums.length; // start with n

    for (let i = 0; i < nums.length; i++) {
        result ^= i ^ nums[i];
    }

    return result;
}

// Alternative: math approach
function missingNumberMath(nums: number[]): number {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
```

---

### Problem 2.6: Sum of Two Integers (Without + or -)
**LeetCode #371 — Medium**

> Calculate sum of two integers without using + or -.

**Why this problem:** Tests deep understanding of how addition works at the bit level.

```typescript
function getSum(a: number, b: number): number {
    while (b !== 0) {
        const carry = (a & b) << 1;  // carry bits (where both are 1)
        a = a ^ b;                    // sum without carry (XOR)
        b = carry;                    // process carry in next iteration
    }
    return a;
}
```

**Why this works:** Binary addition of two bits:
- `0+0=0`, `0+1=1`, `1+0=1` → XOR handles the "no carry" cases
- `1+1=10` → AND finds where carries occur, shift left to move carry to correct position
- Repeat until no more carries

---

### Subsets via Bitmask (Bridge to Bitmask DP)

**Key concept:** A bitmask of length n can represent any subset of n elements. Bit `i` being 1 means element `i` is in the subset.

```typescript
// Generate all subsets using bitmasks
function subsetsViaBitmask(nums: number[]): number[][] {
    const n = nums.length;
    const result: number[][] = [];

    // There are 2^n possible subsets
    for (let mask = 0; mask < (1 << n); mask++) {
        const subset: number[] = [];

        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push(nums[i]);
            }
        }

        result.push(subset);
    }

    return result;
}
```

**Example:**
```
nums = [a, b, c]  (n=3)

mask=0 (000): {}
mask=1 (001): {a}
mask=2 (010): {b}
mask=3 (011): {a, b}
mask=4 (100): {c}
mask=5 (101): {a, c}
mask=6 (110): {b, c}
mask=7 (111): {a, b, c}
```

---

### More Bit Manipulation Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 137 | Single Number II | Bit counting mod 3 |
| 260 | Single Number III | XOR + bit partitioning |
| 201 | Bitwise AND of Numbers Range | Common prefix |
| 461 | Hamming Distance | XOR + count bits |
| 1318 | Minimum Flips to Make a OR b Equal to c | Bit-by-bit analysis |

---

---

## Topic 3: Bitmask DP

### Why This Matters

Bitmask DP handles problems where you need to track **which elements of a set have been used**. When `n` is small (≤ 20), you can represent the "used" state as a bitmask integer, giving you O(2^n) states. This technique solves problems like the Traveling Salesman, optimal task assignment, and partitioning problems that would otherwise be factorial.

### The Bitmask DP Framework

```
State: dp[mask] or dp[mask][additional_state]
  - mask is an integer where bit i indicates whether item i has been used/selected
  - additional_state might be "current position" or "last item chosen"

Transition: iterate over bits in the mask to decide what to add/remove

Base case: dp[0] = initial_value (no items selected)

Answer: dp[(1 << n) - 1] (all items selected) or max/min over all masks
```

**Essential bitmask operations for DP:**
```typescript
const n = items.length;
const fullMask = (1 << n) - 1; // all bits set (all items used)

// Check if item i is in the mask
(mask >> i) & 1

// Add item i to the mask
mask | (1 << i)

// Remove item i from the mask
mask & ~(1 << i)

// Count items in the mask
function popcount(mask: number): number {
    let count = 0;
    while (mask > 0) {
        mask &= (mask - 1);
        count++;
    }
    return count;
}

// Iterate over all subsets of a mask
for (let sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // sub is a subset of mask
}
```

---

### Problem 3.1: Partition to K Equal Sum Subsets
**LeetCode #698 — Medium**

> Can you partition an array into k subsets with equal sum?

**Why this problem:** Classic bitmask DP. Track which elements have been assigned to a group.

```typescript
function canPartitionKSubsets(nums: number[], k: number): boolean {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    if (totalSum % k !== 0) return false;

    const targetSum = totalSum / k;
    const n = nums.length;

    // Sort descending for early pruning
    nums.sort((a, b) => b - a);
    if (nums[0] > targetSum) return false;

    // dp[mask] = true if the elements in mask can be partitioned
    // into some number of complete groups, each summing to targetSum
    const dp = new Array(1 << n).fill(false);
    const currentSum = new Array(1 << n).fill(0);
    dp[0] = true;

    for (let mask = 0; mask < (1 << n); mask++) {
        if (!dp[mask]) continue;

        for (let i = 0; i < n; i++) {
            // Skip if item i is already used
            if (mask & (1 << i)) continue;

            const newMask = mask | (1 << i);

            // Skip if already processed
            if (dp[newMask]) continue;

            // currentSum[mask] % targetSum gives the "partial sum" of the
            // current incomplete group
            const partialSum = currentSum[mask] % targetSum;

            if (partialSum + nums[i] <= targetSum) {
                dp[newMask] = true;
                currentSum[newMask] = currentSum[mask] + nums[i];
            }
        }
    }

    return dp[(1 << n) - 1];
}
```

**How `currentSum % targetSum` works:**
When a group reaches `targetSum`, the modulo resets to 0, meaning we've completed a group and start filling the next one. The running sum modulo target effectively tracks the "fill level" of the current incomplete group.

---

### Problem 3.2: Minimum Cost to Visit Every Node (Traveling Salesman variant)
**LeetCode #943 — Hard (Shortest Superstring) / TSP Pattern**

> Visit all nodes in a weighted graph with minimum total cost, starting from any node.

**This is the classic Traveling Salesman Problem (TSP) solved with bitmask DP.**

```typescript
// Generic TSP template
function tsp(dist: number[][]): number {
    const n = dist.length;
    const fullMask = (1 << n) - 1;

    // dp[mask][i] = minimum cost to visit all nodes in mask,
    //              ending at node i
    const dp: number[][] = Array.from(
        { length: 1 << n },
        () => new Array(n).fill(Infinity)
    );

    // Base case: start at each node individually
    for (let i = 0; i < n; i++) {
        dp[1 << i][i] = 0; // only visited node i, cost 0
    }

    // Iterate over all masks in increasing order of set bits
    for (let mask = 1; mask <= fullMask; mask++) {
        for (let last = 0; last < n; last++) {
            // Skip if last node is not in the mask
            if (!(mask & (1 << last))) continue;
            if (dp[mask][last] === Infinity) continue;

            // Try adding each unvisited node
            for (let next = 0; next < n; next++) {
                if (mask & (1 << next)) continue; // already visited

                const newMask = mask | (1 << next);
                const newCost = dp[mask][last] + dist[last][next];

                dp[newMask][next] = Math.min(dp[newMask][next], newCost);
            }
        }
    }

    // Answer: minimum over all ending nodes with all nodes visited
    let result = Infinity;
    for (let i = 0; i < n; i++) {
        result = Math.min(result, dp[fullMask][i]);
    }

    return result;
}
```

**Complexity:** O(2^n × n²) time, O(2^n × n) space. Works for n ≤ 20.

---

### Problem 3.3: Shortest Path Visiting All Nodes
**LeetCode #847 — Hard**

> Find the shortest path that visits every node in an undirected unweighted graph. Can revisit nodes and edges.

**Why this problem:** BFS + bitmask. The state is `(current_node, visited_mask)`.

```typescript
function shortestPathLength(graph: number[][]): number {
    const n = graph.length;
    const fullMask = (1 << n) - 1;

    // BFS state: [node, visited_mask, distance]
    const queue: [number, number, number][] = [];
    const visited = new Set<string>();

    // Start BFS from every node (we can start anywhere)
    for (let i = 0; i < n; i++) {
        const initialMask = 1 << i;
        queue.push([i, initialMask, 0]);
        visited.add(`${i},${initialMask}`);
    }

    while (queue.length > 0) {
        const [node, mask, dist] = queue.shift()!;

        // If all nodes visited, return distance
        if (mask === fullMask) return dist;

        // Explore neighbors
        for (const neighbor of graph[node]) {
            const newMask = mask | (1 << neighbor);
            const key = `${neighbor},${newMask}`;

            if (!visited.has(key)) {
                visited.add(key);
                queue.push([neighbor, newMask, dist + 1]);
            }
        }
    }

    return -1;
}
```

**Why BFS works here:** We want the shortest path (minimum steps). BFS in state space `(node, mask)` guarantees we find the shortest path to the state where `mask = fullMask`.

**State space size:** n × 2^n, so this works for n ≤ 12–15.

---

### Problem 3.4: Maximum Students Taking Exam
**LeetCode #1349 — Hard**

> Given a classroom grid with broken/available seats, place maximum students such that no one can see another's answers (no adjacent in left, right, upper-left, upper-right). Rows are processed independently with constraints from previous row.

```typescript
function maxStudents(seats: string[][]): number {
    const m = seats.length;
    const n = seats[0].length;

    // Precompute which seats are available in each row
    const available: number[] = [];
    for (let r = 0; r < m; r++) {
        let mask = 0;
        for (let c = 0; c < n; c++) {
            if (seats[r][c] === '.') {
                mask |= (1 << c);
            }
        }
        available.push(mask);
    }

    // dp[mask] = max students if previous row has arrangement `mask`
    let dp = new Map<number, number>();
    dp.set(0, 0);

    for (let r = 0; r < m; r++) {
        const newDp = new Map<number, number>();

        // Generate all valid arrangements for this row
        const validArrangements: number[] = [];

        for (let mask = 0; mask < (1 << n); mask++) {
            // Must only use available seats
            if ((mask & available[r]) !== mask) continue;
            // No two adjacent students in same row
            if (mask & (mask << 1)) continue;

            validArrangements.push(mask);
        }

        for (const [prevMask, prevCount] of dp) {
            for (const currMask of validArrangements) {
                // Check upper-left and upper-right conflicts
                if (currMask & (prevMask << 1)) continue; // upper-left
                if (currMask & (prevMask >> 1)) continue; // upper-right

                const studentCount = popcount(currMask);
                const total = prevCount + studentCount;

                const existing = newDp.get(currMask) ?? 0;
                if (total > existing) {
                    newDp.set(currMask, total);
                }
            }
        }

        dp = newDp;
    }

    let result = 0;
    for (const count of dp.values()) {
        result = Math.max(result, count);
    }
    return result;
}

function popcount(n: number): number {
    let count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}
```

---

### When to Recognize Bitmask DP

```
Signals:
- n ≤ 15–20 (small enough for 2^n states)
- "Visit all / use all / assign all"
- Need to track WHICH items are used, not just HOW MANY
- Permutation/assignment problems with constraints
- Row-by-row grid problems with constraints between adjacent rows
- "Minimum cost to complete all tasks" with assignment constraints

If n ≤ 20 and you need to track subsets → Bitmask DP
If n ≤ 10 and you need subset of subsets → Iterate submasks
```

---

---

## Topic 4: Interval & Sweep Line Problems

### Why This Matters

Interval problems appear frequently in interviews (meeting rooms, merge intervals, insert intervals). Sweep line is a more advanced technique that processes events in sorted order, handling complex interval queries efficiently.

### Core Concepts

**1. Sort first** — almost every interval problem starts with sorting.
**2. Key sorting strategies:**
- Sort by **start time** for merging and insertion
- Sort by **end time** for greedy scheduling (maximum non-overlapping)
- Sort by **start, then end** for nested interval problems

**3. Sweep line:** Convert intervals into events (start/end), sort all events, and sweep through them maintaining a running count or state.

---

### Problem 4.1: Non-overlapping Intervals
**LeetCode #435 — Medium**

> Find the minimum number of intervals to remove to make the rest non-overlapping.

**Key insight:** This is equivalent to finding the **maximum number of non-overlapping intervals** (greedy interval scheduling). Sort by **end time** and greedily pick the earliest-ending intervals.

```typescript
function eraseOverlapIntervals(intervals: number[][]): number {
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;        // intervals kept
    let prevEnd = -Infinity;

    for (const [start, end] of intervals) {
        if (start >= prevEnd) {
            // No overlap — keep this interval
            count++;
            prevEnd = end;
        }
        // Else: overlap — skip (remove) this interval
    }

    // Removed = total - kept
    return intervals.length - count;
}
```

**Why sort by end time?** Choosing the interval that ends earliest leaves the most room for future intervals. This greedy choice is provably optimal for interval scheduling.

---

### Problem 4.2: Insert Interval
**LeetCode #57 — Medium**

> Insert a new interval into a sorted list of non-overlapping intervals, merging if necessary.

```typescript
function insert(
    intervals: number[][],
    newInterval: number[]
): number[][] {
    const result: number[][] = [];
    let i = 0;
    const n = intervals.length;

    // Phase 1: Add all intervals that end BEFORE the new interval starts
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Phase 2: Merge all intervals that overlap with newInterval
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    // Phase 3: Add all intervals that start AFTER the new interval ends
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}
```

**Visual:**
```
intervals = [[1,3], [6,9]], newInterval = [2,5]

Phase 1: [1,3] ends at 3, newInterval starts at 2. 3 >= 2, so no intervals fully before.
          Actually 3 < 2 is false, so we go to Phase 2 immediately.

Wait: intervals[0][1] = 3 < newInterval[0] = 2? No (3 >= 2). Skip Phase 1.

Phase 2: intervals[0][0] = 1 <= newInterval[1] = 5? Yes → merge.
         newInterval = [min(2,1), max(5,3)] = [1,5]
         intervals[1][0] = 6 <= 5? No → stop merging.
         Push [1,5].

Phase 3: Push [6,9].

Result: [[1,5], [6,9]] ✓
```

---

### Problem 4.3: Meeting Rooms II — Sweep Line
**LeetCode #253 — Medium (Premium) / Very Common**

> Given meeting intervals, find the minimum number of conference rooms required.

**Why this problem:** The canonical sweep line problem. Instead of comparing intervals directly, decompose them into events.

```typescript
// Approach 1: Sweep Line (event-based)
function minMeetingRooms(intervals: number[][]): number {
    const events: [number, number][] = []; // [time, type]
    // type: +1 for start, -1 for end

    for (const [start, end] of intervals) {
        events.push([start, 1]);   // meeting starts
        events.push([end, -1]);    // meeting ends
    }

    // Sort by time; if tied, process ends before starts
    // (a meeting ending at time t frees a room before a new one starts at t)
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    let currentRooms = 0;
    let maxRooms = 0;

    for (const [, type] of events) {
        currentRooms += type;
        maxRooms = Math.max(maxRooms, currentRooms);
    }

    return maxRooms;
}

// Approach 2: Two sorted arrays (equivalent but simpler to code)
function minMeetingRoomsTwoArrays(intervals: number[][]): number {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

    let rooms = 0;
    let endPointer = 0;

    for (let i = 0; i < starts.length; i++) {
        if (starts[i] < ends[endPointer]) {
            // New meeting starts before earliest ending → need new room
            rooms++;
        } else {
            // A room freed up
            endPointer++;
        }
    }

    return rooms;
}
```

**Sweep line dry run:**
```
intervals = [[0,30], [5,10], [15,20]]

events: [0,+1], [5,+1], [10,-1], [15,+1], [20,-1], [30,-1]

time 0:  rooms = 1, max = 1
time 5:  rooms = 2, max = 2
time 10: rooms = 1, max = 2
time 15: rooms = 2, max = 2
time 20: rooms = 1, max = 2
time 30: rooms = 0, max = 2

Answer: 2 rooms ✓
```

---

### Problem 4.4: Minimum Number of Arrows to Burst Balloons
**LeetCode #452 — Medium**

> Each balloon is an interval [start, end]. An arrow at x bursts all balloons where start ≤ x ≤ end. Find minimum arrows.

```typescript
function findMinArrowShots(points: number[][]): number {
    // Sort by end time (greedy: shoot at earliest end)
    points.sort((a, b) => a[1] - b[1]);

    let arrows = 1;
    let arrowPos = points[0][1]; // shoot at the end of first balloon

    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > arrowPos) {
            // This balloon starts after the arrow → need new arrow
            arrows++;
            arrowPos = points[i][1];
        }
        // Else: this balloon is burst by the existing arrow
    }

    return arrows;
}
```

---

### More Interval Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 56 | Merge Intervals | Sort + merge (Phase 1 review) |
| 986 | Interval List Intersections | Two-pointer on sorted intervals |
| 1288 | Remove Covered Intervals | Sort + greedy |
| 759 | Employee Free Time | Merge all intervals, find gaps |

---

---

## Topic 5: Advanced Sliding Window & Two Pointers

### Why This Matters

Phase 1 covered basic sliding window. Phase 4 tackles the hardest sliding window problems — those requiring multiple data structures, complex validity conditions, or creative window definitions.

---

### Problem 5.1: Minimum Window Substring
**LeetCode #76 — Hard**

> Find the smallest substring of `s` that contains all characters of `t` (including duplicates).

**Why this problem:** Widely considered the hardest "standard" sliding window problem. Mastering this means you can handle any sliding window variant.

```typescript
function minWindow(s: string, t: string): string {
    if (t.length > s.length) return '';

    // Count required characters
    const required = new Map<string, number>();
    for (const char of t) {
        required.set(char, (required.get(char) ?? 0) + 1);
    }

    // Window state
    const window = new Map<string, number>();
    let formed = 0;          // how many unique chars have met the required count
    const needed = required.size; // how many unique chars we need to satisfy

    let left = 0;
    let minLen = Infinity;
    let minStart = 0;

    for (let right = 0; right < s.length; right++) {
        // Expand: add s[right] to window
        const rightChar = s[right];
        window.set(rightChar, (window.get(rightChar) ?? 0) + 1);

        // Check if this character's count now satisfies the requirement
        if (
            required.has(rightChar) &&
            window.get(rightChar) === required.get(rightChar)
        ) {
            formed++;
        }

        // Contract: while window is valid, try to shrink
        while (formed === needed) {
            // Update answer
            const windowLen = right - left + 1;
            if (windowLen < minLen) {
                minLen = windowLen;
                minStart = left;
            }

            // Remove s[left] from window
            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar)! - 1);

            if (
                required.has(leftChar) &&
                window.get(leftChar)! < required.get(leftChar)!
            ) {
                formed--;
            }

            left++;
        }
    }

    return minLen === Infinity
        ? ''
        : s.substring(minStart, minStart + minLen);
}
```

**Why `formed` counter instead of comparing maps each time:**
Comparing two maps is O(26) or O(unique chars) per step. The `formed` counter tracks how many characters have met their quota, making the validity check O(1).

**Dry run:**
```
s = "ADOBECODEBANC", t = "ABC"
required: {A:1, B:1, C:1}, needed = 3

right=0 'A': window={A:1}, formed=1
right=1 'D': window={A:1,D:1}, formed=1
right=2 'O': formed=1
right=3 'B': window={...,B:1}, formed=2
right=4 'E': formed=2
right=5 'C': window={...,C:1}, formed=3 ← VALID!
  Contract: len=6 "ADOBEC", left=0
    remove 'A': window{A:0}, formed=2. left=1. Stop contracting.

right=6 'O': formed=2
...
right=9 'B': formed=2
right=10 'A': window={A:1,...}, formed=3 ← VALID!
  Contract: len=? shrink until invalid
    ...eventually finds "BANC" (length 4)

Result: "BANC" ✓
```

---

### Problem 5.2: Sliding Window Maximum
**LeetCode #239 — Hard**

> Given an array and window size k, return the maximum in each window position.

**Why this problem:** Requires a **monotonic deque** — a deque that maintains elements in decreasing order. This is the sliding window analogue of the monotonic stack.

```typescript
function maxSlidingWindow(nums: number[], k: number): number[] {
    const result: number[] = [];
    const deque: number[] = []; // stores INDICES, front has max

    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside the window from the front
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }

        // Remove elements smaller than current from the back
        // (they'll never be the max while current is in the window)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        deque.push(i);

        // Once we have a full window, record the max (front of deque)
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}
```

**Why the deque maintains decreasing order:**
- The front of the deque is always the maximum in the current window
- When a new element comes in, we remove all smaller elements from the back (they're useless — the new element is bigger and will stay in the window longer)
- When the front element falls out of the window, we remove it
- Each element is added and removed at most once → O(n)

**Dry run:**
```
nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

i=0 (1):  deque=[0]                               
i=1 (3):  pop 0 (1<3). deque=[1]                   
i=2 (-1): deque=[1,2].            window [1,3,-1] → max=nums[1]=3
i=3 (-3): deque=[1,2,3].          window [3,-1,-3] → max=nums[1]=3
i=4 (5):  pop 3,2,1 (all<5). deque=[4]. window [-1,-3,5] → max=5
i=5 (3):  deque=[4,5].            window [-3,5,3] → max=5
i=6 (6):  pop 5 (3<6). deque=[4,6]. Remove 4 (out of window). deque=[6]. window [5,3,6] → max=6
i=7 (7):  pop 6 (6<7). deque=[7]. window [3,6,7] → max=7

result = [3, 3, 5, 5, 6, 7] ✓
```

---

### Problem 5.3: Longest Substring with At Most K Distinct Characters
**LeetCode #340 — Medium (Premium) / Common Pattern**

> Find the length of the longest substring with at most k distinct characters.

```typescript
function lengthOfLongestSubstringKDistinct(
    s: string,
    k: number
): number {
    const window = new Map<string, number>(); // char → count
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        window.set(s[right], (window.get(s[right]) ?? 0) + 1);

        // Shrink while we have too many distinct characters
        while (window.size > k) {
            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar)! - 1);
            if (window.get(leftChar) === 0) {
                window.delete(leftChar);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
```

---

---

## Topic 6: Segment Trees & Binary Indexed Trees (Fenwick Trees)

### Why This Matters

These are specialized data structures for **range queries with point updates**. While less common in interviews than other topics, they appear at top companies and in competitive programming. Knowing when they're needed and understanding the concepts is valuable even if you don't memorize the implementation.

### When You Need Them

```
Problem requirements:
1. Array of values
2. Two operations:
   a. UPDATE: change a single element
   b. QUERY: compute an aggregate (sum, min, max) over a range [l, r]
3. Both operations needed in O(log n)

If you only need queries (no updates) → Prefix Sum is sufficient
If you need both → Segment Tree or Fenwick Tree
```

### Fenwick Tree (Binary Indexed Tree) — For Range Sum

Simpler to implement than a Segment Tree. Handles **point updates** and **prefix sum queries** in O(log n).

```typescript
class FenwickTree {
    private tree: number[];
    private n: number;

    constructor(n: number) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0); // 1-indexed
    }

    // Add `delta` to index `i` (1-indexed)
    update(i: number, delta: number): void {
        while (i <= this.n) {
            this.tree[i] += delta;
            i += i & (-i); // move to parent
        }
    }

    // Get prefix sum [1..i]
    query(i: number): number {
        let sum = 0;
        while (i > 0) {
            sum += this.tree[i];
            i -= i & (-i); // move to responsible node
        }
        return sum;
    }

    // Get range sum [l..r]
    rangeQuery(l: number, r: number): number {
        return this.query(r) - this.query(l - 1);
    }
}
```

**How `i & (-i)` works:** It gives the lowest set bit of `i`. This determines the "responsibility range" of each position in the tree. Moving by this amount traverses the tree structure.

```
Index (binary):  Lowest bit:  Responsible for:
1    (0001)      1            [1, 1]
2    (0010)      2            [1, 2]
3    (0011)      1            [3, 3]
4    (0100)      4            [1, 4]
5    (0101)      1            [5, 5]
6    (0110)      2            [5, 6]
7    (0111)      1            [7, 7]
8    (1000)      8            [1, 8]
```

---

### Segment Tree — For Range Min/Max/Sum with Updates

More versatile than Fenwick Tree. Can handle range minimum, maximum, sum, GCD, etc.

```typescript
class SegmentTree {
    private tree: number[];
    private n: number;

    constructor(nums: number[]) {
        this.n = nums.length;
        this.tree = new Array(4 * this.n).fill(0);
        this.build(nums, 1, 0, this.n - 1);
    }

    private build(
        nums: number[],
        node: number,
        start: number,
        end: number
    ): void {
        if (start === end) {
            this.tree[node] = nums[start];
            return;
        }

        const mid = Math.floor((start + end) / 2);
        this.build(nums, 2 * node, start, mid);
        this.build(nums, 2 * node + 1, mid + 1, end);
        this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
    }

    update(index: number, val: number): void {
        this.updateHelper(1, 0, this.n - 1, index, val);
    }

    private updateHelper(
        node: number,
        start: number,
        end: number,
        index: number,
        val: number
    ): void {
        if (start === end) {
            this.tree[node] = val;
            return;
        }

        const mid = Math.floor((start + end) / 2);

        if (index <= mid) {
            this.updateHelper(2 * node, start, mid, index, val);
        } else {
            this.updateHelper(2 * node + 1, mid + 1, end, index, val);
        }

        this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
    }

    query(l: number, r: number): number {
        return this.queryHelper(1, 0, this.n - 1, l, r);
    }

    private queryHelper(
        node: number,
        start: number,
        end: number,
        l: number,
        r: number
    ): number {
        // No overlap
        if (r < start || end < l) return 0;

        // Complete overlap
        if (l <= start && end <= r) return this.tree[node];

        // Partial overlap
        const mid = Math.floor((start + end) / 2);
        return (
            this.queryHelper(2 * node, start, mid, l, r) +
            this.queryHelper(2 * node + 1, mid + 1, end, l, r)
        );
    }
}
```

---

### Problem 6.1: Range Sum Query — Mutable
**LeetCode #307 — Medium**

> Implement `update(index, val)` and `sumRange(left, right)`.

```typescript
class NumArray {
    private fenwick: FenwickTree;
    private nums: number[];

    constructor(nums: number[]) {
        this.nums = [...nums];
        this.fenwick = new FenwickTree(nums.length);

        for (let i = 0; i < nums.length; i++) {
            this.fenwick.update(i + 1, nums[i]); // 1-indexed
        }
    }

    update(index: number, val: number): void {
        const delta = val - this.nums[index];
        this.nums[index] = val;
        this.fenwick.update(index + 1, delta);
    }

    sumRange(left: number, right: number): number {
        return this.fenwick.rangeQuery(left + 1, right + 1);
    }
}
```

---

### Problem 6.2: Count of Smaller Numbers After Self
**LeetCode #315 — Hard**

> For each element, count how many elements to its right are smaller.

**Why this problem:** Classic application of Fenwick Tree (or merge sort). Process from right to left, using the Fenwick Tree to count elements smaller than the current one.

```typescript
function countSmaller(nums: number[]): number[] {
    // Coordinate compression: map values to ranks 1..n
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const rankMap = new Map<number, number>();
    sorted.forEach((val, idx) => rankMap.set(val, idx + 1));

    const n = sorted.length;
    const fenwick = new FenwickTree(n);
    const result = new Array(nums.length);

    // Process from right to left
    for (let i = nums.length - 1; i >= 0; i--) {
        const rank = rankMap.get(nums[i])!;

        // Count elements with rank < current rank (smaller elements)
        result[i] = fenwick.query(rank - 1);

        // Add current element to the tree
        fenwick.update(rank, 1);
    }

    return result;
}
```

**How this works:**
- Processing right to left ensures we only count elements that come AFTER the current position
- `query(rank - 1)` returns how many elements with rank < current have been added so far (i.e., elements to the right that are smaller)
- `update(rank, 1)` adds the current element to the frequency tree

---

### More Range Query Problems

| # | Problem | Key Concept |
|---|---|---|
| 303 | Range Sum Query Immutable | Prefix sum (no updates needed) |
| 304 | Range Sum Query 2D Immutable | 2D prefix sum |
| 327 | Count of Range Sum | Merge sort or Fenwick Tree |
| 493 | Reverse Pairs | Merge sort or Fenwick Tree |

---

---

## Topic 7: Combination Patterns — Where Multiple Techniques Merge

### Why This Matters

The hardest interview problems don't fit neatly into one pattern. They require combining two or more techniques. This section trains you to recognize and execute these combinations.

---

### Combination 7.1: Binary Search + Greedy/Simulation

**Pattern:** Binary search on the answer, with a greedy feasibility check.

### Problem 7.1: Split Array Largest Sum
**LeetCode #410 — Hard**

> Split an array into k subarrays to minimize the largest subarray sum.

**Why this problem:** The "minimize the maximum" phrasing screams binary search on answer.

```typescript
function splitArray(nums: number[], k: number): number {
    let lo = Math.max(...nums);             // minimum possible answer
    let hi = nums.reduce((a, b) => a + b);   // maximum possible answer

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (canSplit(nums, k, mid)) {
            hi = mid;       // this max sum works, try smaller
        } else {
            lo = mid + 1;   // can't split with this max, need larger
        }
    }

    return lo;
}

function canSplit(
    nums: number[],
    k: number,
    maxSum: number
): boolean {
    let subarrays = 1;
    let currentSum = 0;

    for (const num of nums) {
        currentSum += num;

        if (currentSum > maxSum) {
            // Start a new subarray
            subarrays++;
            currentSum = num;

            if (subarrays > k) return false;
        }
    }

    return true;
}
```

**Monotonic condition:** If we can split with max sum `x`, we can also split with max sum `x + 1` (less restrictive). So `canSplit` is monotonic in `maxSum`.

---

### Combination 7.2: DP + Binary Search

### Problem 7.2: Russian Doll Envelopes
**LeetCode #354 — Hard**

> Given envelopes `[width, height]`, find the maximum number of envelopes you can nest (strictly increasing in both dimensions).

**Key insight:** Sort by width ascending, then by height **descending** (for same width). Then find the **LIS by height** — which reduces to the LIS problem solvable in O(n log n) with binary search.

```typescript
function maxEnvelopes(envelopes: number[][]): number {
    // Sort by width ascending; for same width, height descending
    // Descending height for same width prevents two envelopes with
    // same width from both being selected
    envelopes.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return b[1] - a[1]; // descending height
    });

    // LIS on heights using O(n log n) patience sorting
    const tails: number[] = [];

    for (const [, height] of envelopes) {
        let lo = 0;
        let hi = tails.length;

        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (tails[mid] >= height) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        if (lo === tails.length) {
            tails.push(height);
        } else {
            tails[lo] = height;
        }
    }

    return tails.length;
}
```

**Why sort height descending for same width?**
If widths are `[3,3]` and heights are `[5,6]`, we don't want both in the LIS (same width can't nest). By sorting heights `[6,5]`, the LIS won't pick both since 5 < 6 isn't satisfied in the "increasing" direction after 6.

---

### Combination 7.3: Graph + DP

### Problem 7.3: Longest Increasing Path in a Matrix
**LeetCode #329 — Hard**

> Find the longest strictly increasing path in a matrix (can move in 4 directions).

**Why this problem:** DFS + memoization on a grid. The "strictly increasing" constraint guarantees no cycles, so we can memoize safely.

```typescript
function longestIncreasingPath(matrix: number[][]): number {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const memo: number[][] = Array.from(
        { length: rows },
        () => new Array(cols).fill(0)
    );

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(r: number, c: number): number {
        if (memo[r][c] !== 0) return memo[r][c];

        let maxPath = 1;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                matrix[nr][nc] > matrix[r][c] // strictly increasing
            ) {
                maxPath = Math.max(maxPath, 1 + dfs(nr, nc));
            }
        }

        memo[r][c] = maxPath;
        return maxPath;
    }

    let result = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            result = Math.max(result, dfs(r, c));
        }
    }

    return result;
}
```

**Why memoization is safe (no cycle issue):** We only move to cells with strictly greater values. You can never return to a cell you've visited, so there are no cycles. Each cell's result depends only on cells with higher values, which will be computed correctly.

---

### Combination 7.4: Stack + DP

### Problem 7.4: Largest Rectangle in Histogram
**LeetCode #84 — Hard**

> Find the area of the largest rectangle that can be formed in a histogram.

**Why this problem:** Uses a monotonic stack to find the "nearest smaller element" on both sides. One of the most important hard problems.

```typescript
function largestRectangleArea(heights: number[]): number {
    const n = heights.length;
    const stack: number[] = []; // stores indices, monotonically increasing heights
    let maxArea = 0;

    for (let i = 0; i <= n; i++) {
        // Use height 0 as sentinel to flush the stack at the end
        const currentHeight = i === n ? 0 : heights[i];

        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];

            // Width: from the previous element in stack (left boundary)
            // to current index (right boundary)
            const width = stack.length === 0
                ? i                           // extends to the beginning
                : i - stack[stack.length - 1] - 1;

            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}
```

**How the width calculation works:**
When we pop index `j` from the stack:
- The **right boundary** is `i` (current index — the first shorter bar to the right)
- The **left boundary** is `stack[top]` (the element below `j` in the stack — the first shorter bar to the left)
- Width = `i - stack[top] - 1`
- If the stack is empty after popping, the bar extends all the way to index 0

**Dry run:**
```
heights = [2, 1, 5, 6, 2, 3]

i=0 (2): stack=[0]
i=1 (1): 1 < 2 → pop 0. height=2, width=1 (stack empty). area=2. stack=[1]
i=2 (5): stack=[1,2]
i=3 (6): stack=[1,2,3]
i=4 (2): 2 < 6 → pop 3. height=6, width=4-2-1=1. area=6
         2 < 5 → pop 2. height=5, width=4-1-1=2. area=10. stack=[1,4]
i=5 (3): stack=[1,4,5]
i=6 (0): 0 < 3 → pop 5. height=3, width=6-4-1=1. area=3
         0 < 2 → pop 4. height=2, width=6-1-1=4. area=8
         0 < 1 → pop 1. height=1, width=6 (empty). area=6

maxArea = 10 ✓ (height 5, width 2: bars at indices 2 and 3)
```

---

### Combination 7.5: Maximal Rectangle (Histogram + DP)
**LeetCode #85 — Hard**

> Find the largest rectangle containing only 1's in a binary matrix.

**Key insight:** Build a histogram for each row (where height = consecutive 1's above), then apply Largest Rectangle in Histogram for each row.

```typescript
function maximalRectangle(matrix: string[][]): number {
    if (matrix.length === 0) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;

    for (let r = 0; r < rows; r++) {
        // Update histogram heights
        for (let c = 0; c < cols; c++) {
            heights[c] = matrix[r][c] === '1' ? heights[c] + 1 : 0;
        }

        // Apply largest rectangle in histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}
```

**Visual:**
```
Matrix:          Histograms by row:
1 0 1 0 0       heights = [1,0,1,0,0]  → max rect = 1
1 0 1 1 1       heights = [2,0,2,1,1]  → max rect = 3
1 1 1 1 1       heights = [3,1,3,2,2]  → max rect = 6
1 0 0 1 0       heights = [4,0,0,3,0]  → max rect = 4

Answer: 6 ✓
```

---

### Problem 7.6: Trapping Rain Water
**LeetCode #42 — Hard**

> Given elevation bars, compute how much water can be trapped.

**Multiple approaches — know at least two:**

```typescript
// Approach 1: Two Pointers — O(n) time, O(1) space (best)
function trap(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            // The water at `left` is bounded by leftMax
            // (because there's something at least as tall on the right)
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }

    return water;
}

// Approach 2: Precompute left max and right max — O(n) time, O(n) space
function trapPrecompute(height: number[]): number {
    const n = height.length;
    if (n === 0) return 0;

    const leftMax = new Array(n);
    const rightMax = new Array(n);

    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let water = 0;
    for (let i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return water;
}

// Approach 3: Monotonic Stack — O(n) time, O(n) space
function trapStack(height: number[]): number {
    const stack: number[] = []; // indices
    let water = 0;

    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const bottom = stack.pop()!;

            if (stack.length === 0) break;

            const left = stack[stack.length - 1];
            const width = i - left - 1;
            const boundedHeight = Math.min(height[left], height[i]) - height[bottom];
            water += width * boundedHeight;
        }

        stack.push(i);
    }

    return water;
}
```

---

### Combination Pattern Recognition Summary

```
"Minimize the maximum" / "Maximize the minimum"
    → Binary Search on Answer + Greedy Feasibility Check

"2D problem reducible to 1D"
    → Process row by row, apply 1D technique (histogram, DP)

"Shortest path with state"
    → BFS/Dijkstra in expanded state space (node, mask/state)

"Optimal over all subsets/assignments"
    → Bitmask DP (if n ≤ 20)

"Range query + updates"
    → Segment Tree or Fenwick Tree

"Grid DFS with dictionary"
    → Trie + Backtracking

"Longest something in a matrix"
    → DFS + Memoization (if monotonic property prevents cycles)

"Complex sliding window"
    → Window + Monotonic Deque / HashMap with counters
```

---

---

## Phase 4: Putting It All Together

### Week 9 Daily Schedule

| Day | Focus | Problems |
|---|---|---|
| Day 1 | Trie basics | #208 Implement Trie, #211 Add & Search Words |
| Day 2 | Trie advanced | #212 Word Search II, #1268 Search Suggestions System |
| Day 3 | Bit manipulation | #136 Single Number, #191 Number of 1 Bits, #338 Counting Bits, #268 Missing Number |
| Day 4 | Bitmask DP | #698 Partition to K Equal Sum Subsets, #847 Shortest Path Visiting All Nodes |
| Day 5 | Intervals + sweep line | #435 Non-overlapping Intervals, #57 Insert Interval, #253 Meeting Rooms II |
| Day 6 | Hard sliding window | #76 Minimum Window Substring, #239 Sliding Window Maximum |
| Day 7 | Review + rest | Re-solve 2-3 problems that gave you trouble |

### Week 10 Daily Schedule

| Day | Focus | Problems |
|---|---|---|
| Day 8 | Segment/Fenwick Tree | #307 Range Sum Query Mutable, #315 Count of Smaller Numbers After Self |
| Day 9 | Combination: Binary Search + Greedy | #410 Split Array Largest Sum, #1011 Capacity to Ship Packages |
| Day 10 | Combination: Stack + DP | #84 Largest Rectangle in Histogram, #85 Maximal Rectangle |
| Day 11 | Combination: Graph + DP | #329 Longest Increasing Path in Matrix, #42 Trapping Rain Water |
| Day 12 | Hard problems mixed | #354 Russian Doll Envelopes, #124 Binary Tree Max Path Sum, #297 Serialize/Deserialize Tree |
| Day 13 | Mock interview simulation | 4 problems (1 easy, 2 medium, 1 hard) in 2 hours, timed |
| Day 14 | Final review | Review ALL patterns, redo 1 problem from each major category |

---

### Final Checklist — Interview Readiness

**Fundamentals (Phase 1):**
- [ ] Arrays, Strings, Hash Maps are automatic
- [ ] Two Pointers and Sliding Window are second nature
- [ ] I apply sorting as a preprocessing step instinctively

**Core Patterns (Phase 2):**
- [ ] Binary search (exact, boundary, on answer) — no bugs
- [ ] Stack problems including monotonic stack
- [ ] Linked list manipulation (reverse, merge, cycle detection)
- [ ] Tree DFS (pre/in/post order) and BFS (level order)
- [ ] Graph BFS/DFS with proper visited tracking

**Advanced Patterns (Phase 3):**
- [ ] DP: I can define state, recurrence, base case for any DP problem
- [ ] DP: I know 0/1 vs unbounded knapsack and loop directions
- [ ] Backtracking: subsets, permutations, combinations from memory
- [ ] Heaps: top-K, merge-K, two-heap median
- [ ] Union-Find implementation from scratch
- [ ] Dijkstra's algorithm

**Mastery (Phase 4):**
- [ ] Trie implementation and usage in search problems
- [ ] Bit manipulation tricks (XOR, set/clear/toggle bits)
- [ ] Bitmask DP for small n
- [ ] Interval/sweep line problems
- [ ] Hard sliding window (Minimum Window Substring level)
- [ ] Combination patterns (binary search + greedy, stack + DP, etc.)
- [ ] I can solve most mediums in 20-25 minutes
- [ ] I can make meaningful progress on hards in 30-35 minutes

**Interview Skills:**
- [ ] I explain my thinking before coding
- [ ] I identify the pattern within 2-3 minutes of reading
- [ ] I state brute force first, then optimize
- [ ] I test with examples and edge cases after coding
- [ ] I analyze time and space complexity confidently
- [ ] I handle hints and pivots gracefully

---

## Appendix: The Complete Pattern Decision Tree

When facing a new problem, run through this mental flowchart:

```
1. READ the problem twice. Identify input/output types.

2. CHECK CONSTRAINTS for complexity hints:
   n ≤ 15-20    → Backtracking, Bitmask DP
   n ≤ 100      → O(n³) DP
   n ≤ 1000     → O(n²) DP
   n ≤ 100K     → O(n log n) sort, binary search, heap
   n ≤ 1M+      → O(n) hash map, two pointers, sliding window

3. IDENTIFY the problem type:
   Sorted array/search space?     → Binary Search
   Contiguous subarray/substring? → Sliding Window
   Subsequence (not contiguous)?  → DP
   Pairs/triplets?                → Two Pointers (if sorted) or Hash Map
   Tree structure?                → DFS recursion
   Level-by-level?                → BFS
   Graph traversal?               → BFS/DFS
   Shortest path (unweighted)?    → BFS
   Shortest path (weighted)?      → Dijkstra
   Dependencies/ordering?         → Topological Sort
   Dynamic connectivity?          → Union-Find
   Generate all solutions?        → Backtracking
   Count ways / optimize?         → DP
   Top K / running min-max?       → Heap
   Nested structure / matching?   → Stack
   Prefix operations on strings?  → Trie
   Range query + update?          → Segment Tree / Fenwick Tree
   Intervals?                     → Sort + Greedy or Sweep Line
   Small set tracking (n≤20)?     → Bitmask
   "Minimize the maximum"?        → Binary Search on Answer

4. If stuck, ask:
   "What am I recomputing?" → Cache it (DP/memoization)
   "Can a hash map help?"   → Usually yes
   "What if I sorted it?"   → Often simplifies dramatically
   "What's the brute force?" → Then optimize the bottleneck
```

---
