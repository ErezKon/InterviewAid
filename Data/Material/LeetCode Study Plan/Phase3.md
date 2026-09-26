
# Phase 3: Advanced Patterns (Weeks 6–8)

## The Goal

Phase 2 gave you the core toolkit: binary search, stacks, linked lists, trees, and basic graphs. Phase 3 is where you become dangerous. **Dynamic programming**, **backtracking**, **heaps**, and **advanced graph algorithms** are the patterns that separate candidates who clear interviews from those who don't. These topics are harder, but they all follow learnable, repeatable frameworks.

---

---

## Topic 1: Dynamic Programming (DP)

### Why This Matters

DP is the most feared and most tested advanced topic. But here's the truth: **DP is not about cleverness — it's about systematic thinking.** Every DP problem follows the same process. Once you internalize the framework and practice enough problems across the major categories, DP becomes formulaic.

### What IS Dynamic Programming?

DP is an optimization technique for problems with two properties:

**1. Optimal Substructure:** The optimal solution to the problem can be constructed from optimal solutions to its subproblems.

**2. Overlapping Subproblems:** The same subproblems are solved multiple times. DP stores their results to avoid recomputation.

If a problem has optimal substructure but NO overlapping subproblems, you want **divide and conquer** (like merge sort). If it has overlapping subproblems, you want DP.

### The 6-Step DP Framework

For EVERY DP problem, follow these steps:

```
Step 1: IDENTIFY — Is this a DP problem?
  Signals: "count the number of ways," "minimum/maximum cost,"
  "is it possible," "longest/shortest subsequence"

Step 2: DEFINE STATE — What variables describe a subproblem?
  Ask: "What information do I need to make a decision at each step?"
  dp[i] = "the answer for the first i elements"
  dp[i][j] = "the answer using elements up to i with capacity j"

Step 3: DEFINE RECURRENCE — How does the current state relate to previous states?
  This is the hard part. Ask: "What choices do I have at step i?
  How does each choice connect to a smaller subproblem?"

Step 4: DEFINE BASE CASE — What's the smallest subproblem I can solve directly?
  dp[0] = ?, dp[0][0] = ?, etc.

Step 5: DETERMINE ORDER — In what order should I fill the table?
  Make sure every state is computed BEFORE it's needed.

Step 6: EXTRACT ANSWER — Where in the table is the final answer?
  dp[n]? dp[n][target]? max(dp[i] for all i)?
```

### Top-Down vs Bottom-Up

**Top-Down (Memoization):**
- Write the recursive solution naturally
- Add a cache to store results
- Easier to write; follows problem structure directly
- Can have recursion overhead

```typescript
function solveTopDown(n: number): number {
    const memo = new Map<number, number>();

    function dp(state: number): number {
        if (memo.has(state)) return memo.get(state)!;
        if (/* base case */) return BASE_VALUE;

        const result = /* recurrence using dp(smaller states) */;
        memo.set(state, result);
        return result;
    }

    return dp(n);
}
```

**Bottom-Up (Tabulation):**
- Build a table iteratively from base cases
- No recursion overhead
- Easier to optimize space
- Must determine correct iteration order

```typescript
function solveBottomUp(n: number): number {
    const dp = new Array(n + 1).fill(0);
    dp[0] = BASE_VALUE; // base case

    for (let i = 1; i <= n; i++) {
        dp[i] = /* recurrence using dp[smaller indices] */;
    }

    return dp[n];
}
```

**Which to use?** Start with top-down (easier to think through), then convert to bottom-up if needed for optimization.

---

### Category A: 1D DP — Linear Sequence

These are the simplest DP problems. The state is a single variable, usually an index into the input array.

---

### Problem 1.1: Climbing Stairs
**LeetCode #70 — Easy**

> You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?

**Why this problem:** The "hello world" of DP. If you can solve this, you understand the framework.

**Applying the 6-step framework:**
1. **Identify:** "How many ways" → DP
2. **State:** `dp[i]` = number of ways to reach step `i`
3. **Recurrence:** To reach step `i`, you came from step `i-1` (1 step) or step `i-2` (2 steps). `dp[i] = dp[i-1] + dp[i-2]`
4. **Base case:** `dp[0] = 1` (one way to stand at ground), `dp[1] = 1` (one way to reach step 1)
5. **Order:** Left to right (increasing `i`)
6. **Answer:** `dp[n]`

```typescript
// Bottom-up
function climbStairs(n: number): number {
    if (n <= 2) return n;

    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Space-optimized: we only need the last two values
function climbStairsOptimized(n: number): number {
    if (n <= 2) return n;

    let prev2 = 1; // dp[i-2]
    let prev1 = 1; // dp[i-1]

    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

**Space optimization insight:** If `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, you don't need the whole array — just two variables. This applies to many 1D DP problems.

---

### Problem 1.2: House Robber
**LeetCode #198 — Medium**

> Rob houses along a street. Can't rob two adjacent houses. Maximize total money.

**Why this problem:** The classic "take or skip" DP pattern. Every element presents a binary choice.

**Applying the framework:**
1. **Identify:** "Maximize" with a constraint → DP
2. **State:** `dp[i]` = max money from the first `i` houses
3. **Recurrence:** For house `i`, either:
   - **Skip it:** `dp[i] = dp[i-1]` (best answer without house i)
   - **Rob it:** `dp[i] = dp[i-2] + nums[i]` (must skip house i-1, plus this house's value)
   - Take the max: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
4. **Base case:** `dp[0] = nums[0]`, `dp[1] = max(nums[0], nums[1])`
5. **Order:** Left to right
6. **Answer:** `dp[n-1]`

```typescript
function rob(nums: number[]): number {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];

    const dp = new Array(n);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(
            dp[i - 1],             // skip house i
            dp[i - 2] + nums[i]   // rob house i
        );
    }

    return dp[n - 1];
}

// Space-optimized
function robOptimized(nums: number[]): number {
    let prev2 = 0; // dp[i-2]
    let prev1 = 0; // dp[i-1]

    for (const num of nums) {
        const current = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

**Dry run:**
```
nums = [2, 7, 9, 3, 1]

dp[0] = 2
dp[1] = max(2, 7) = 7
dp[2] = max(7, 2+9) = 11     (rob houses 0 and 2)
dp[3] = max(11, 7+3) = 11    (skip house 3)
dp[4] = max(11, 11+1) = 12   (rob houses 0, 2, and 4)

Return 12 ✓
```

---

### Problem 1.3: Coin Change
**LeetCode #322 — Medium**

> Given coins of different denominations and a total amount, find the fewest number of coins needed. Return -1 if not possible.

**Why this problem:** Classic "unbounded knapsack" / "minimum cost" DP. Unlike House Robber where you move through indices, here you build up to a target amount.

**Framework:**
1. **Identify:** "Fewest number" → minimize → DP
2. **State:** `dp[amount]` = minimum coins needed to make `amount`
3. **Recurrence:** For each coin `c`, if we use it: `dp[amount] = dp[amount - c] + 1`. Try all coins, take the minimum.
4. **Base case:** `dp[0] = 0` (zero coins for amount zero)
5. **Order:** From amount 1 up to target
6. **Answer:** `dp[target]`

```typescript
function coinChange(coins: number[], amount: number): number {
    // dp[i] = minimum coins to make amount i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

**Dry run:**
```
coins = [1, 3, 4], amount = 6

dp[0] = 0
dp[1] = min(dp[0]+1) = 1                    → one 1-coin
dp[2] = min(dp[1]+1) = 2                    → two 1-coins
dp[3] = min(dp[2]+1, dp[0]+1) = 1           → one 3-coin
dp[4] = min(dp[3]+1, dp[1]+1, dp[0]+1) = 1  → one 4-coin
dp[5] = min(dp[4]+1, dp[2]+1, dp[1]+1) = 2  → 4+1 or 3+... 
dp[6] = min(dp[5]+1, dp[3]+1, dp[2]+1) = 2  → 3+3

Return 2 ✓
```

---

### Problem 1.4: Longest Increasing Subsequence (LIS)
**LeetCode #300 — Medium**

> Find the length of the longest strictly increasing subsequence.

**Why this problem:** One of the most important DP problems. The O(n²) solution teaches classic DP; the O(n log n) solution combines DP with binary search.

```typescript
// O(n²) DP approach
function lengthOfLIS(nums: number[]): number {
    const n = nums.length;

    // dp[i] = length of LIS ending at index i
    const dp = new Array(n).fill(1); // every element is a subsequence of length 1

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

// O(n log n) approach using patience sorting / binary search
function lengthOfLISOptimal(nums: number[]): number {
    // tails[i] = smallest tail element for an increasing subsequence of length i+1
    const tails: number[] = [];

    for (const num of nums) {
        // Binary search for the leftmost position where tails[pos] >= num
        let lo = 0;
        let hi = tails.length;

        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (tails[mid] >= num) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        if (lo === tails.length) {
            tails.push(num); // extend the longest subsequence
        } else {
            tails[lo] = num; // replace to keep the smallest possible tail
        }
    }

    return tails.length;
}
```

**O(n log n) intuition:** Maintain an array `tails` where `tails[i]` is the smallest possible last element of any increasing subsequence of length `i+1`. For each new number, either extend the array (if it's bigger than everything) or replace an existing element to create a "better" subsequence of the same length.

**Dry run (O(n log n)):**
```
nums = [10, 9, 2, 5, 3, 7, 101, 18]

num=10:  tails=[]   → append.   tails=[10]
num=9:   9 < 10     → replace.  tails=[9]
num=2:   2 < 9      → replace.  tails=[2]
num=5:   5 > 2      → append.   tails=[2, 5]
num=3:   3 < 5      → replace.  tails=[2, 3]
num=7:   7 > 3      → append.   tails=[2, 3, 7]
num=101: 101 > 7    → append.   tails=[2, 3, 7, 101]
num=18:  18 < 101   → replace.  tails=[2, 3, 7, 18]

Length = 4 ✓
```

Note: `tails` is NOT the actual LIS — it's just a structure that tracks the length correctly.

---

### Problem 1.5: Word Break
**LeetCode #139 — Medium**

> Given a string `s` and a dictionary of words, determine if `s` can be segmented into dictionary words.

**Why this problem:** DP on strings. The state tracks "can we successfully parse up to index i?"

```typescript
function wordBreak(s: string, wordDict: string[]): boolean {
    const wordSet = new Set(wordDict);
    const n = s.length;

    // dp[i] = true if s[0..i-1] can be segmented into dictionary words
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // empty string is valid

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            // If s[0..j-1] can be segmented AND s[j..i-1] is a dictionary word
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break; // no need to check other j values
            }
        }
    }

    return dp[n];
}
```

**Dry run:**
```
s = "leetcode", wordDict = ["leet", "code"]

dp[0] = true
dp[1]: j=0, s[0..0]="l" → not in dict. dp[1]=false
dp[2]: j=0, "le" no. j=1, dp[1]=false. dp[2]=false
dp[3]: j=0, "lee" no. ... dp[3]=false
dp[4]: j=0, dp[0]=true, s[0..3]="leet" → YES! dp[4]=true
dp[5]: j=0 "leetc" no, j=4 dp[4]=true "c" no. dp[5]=false
dp[6]: ... dp[6]=false
dp[7]: ... dp[7]=false
dp[8]: j=0 "leetcode" no, j=4 dp[4]=true "code" YES! dp[8]=true

Return true ✓
```

---

### Problem 1.6: Decode Ways
**LeetCode #91 — Medium**

> A message of digits can be decoded where '1'→'A', '2'→'B', ..., '26'→'Z'. Count the number of ways to decode a string of digits.

**Why this problem:** Similar structure to Climbing Stairs but with validity constraints. Teaches conditional transitions.

```typescript
function numDecodings(s: string): number {
    const n = s.length;
    if (n === 0 || s[0] === '0') return 0;

    // dp[i] = number of ways to decode s[0..i-1]
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1; // empty string
    dp[1] = 1; // first character (already checked it's not '0')

    for (let i = 2; i <= n; i++) {
        const oneDigit = parseInt(s[i - 1]);        // single digit
        const twoDigit = parseInt(s.substring(i - 2, i)); // two digits

        // Can we decode the single digit? (1-9 are valid)
        if (oneDigit >= 1) {
            dp[i] += dp[i - 1];
        }

        // Can we decode the two-digit number? (10-26 are valid)
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
}
```

---

### Category B: 2D DP — Grids and Two Sequences

The state involves two variables, creating a 2D table. This happens when you're working with a grid, or comparing/combining two sequences.

---

### Problem 1.7: Unique Paths
**LeetCode #62 — Medium**

> A robot on an `m×n` grid starts top-left and can only move right or down. How many unique paths to the bottom-right?

**Framework:**
1. **State:** `dp[r][c]` = number of paths to reach cell `(r, c)`
2. **Recurrence:** `dp[r][c] = dp[r-1][c] + dp[r][c-1]` (came from above or left)
3. **Base case:** `dp[0][c] = 1` for all c, `dp[r][0] = 1` for all r (only one way along edges)
4. **Answer:** `dp[m-1][n-1]`

```typescript
function uniquePaths(m: number, n: number): number {
    const dp: number[][] = Array.from(
        { length: m },
        () => new Array(n).fill(0)
    );

    // Base cases: first row and first column are all 1s
    for (let r = 0; r < m; r++) dp[r][0] = 1;
    for (let c = 0; c < n; c++) dp[0][c] = 1;

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
        }
    }

    return dp[m - 1][n - 1];
}

// Space-optimized: only need the previous row
function uniquePathsOptimized(m: number, n: number): number {
    const dp = new Array(n).fill(1);

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            dp[c] = dp[c] + dp[c - 1];
            // dp[c] (before update) = value from row above
            // dp[c-1] = value from the left (already updated this row)
        }
    }

    return dp[n - 1];
}
```

**Visual:**
```
3×4 grid:

1  1  1  1
1  2  3  4
1  3  6  10

dp[2][3] = 10 paths ✓
```

---

### Problem 1.8: Longest Common Subsequence (LCS)
**LeetCode #1143 — Medium**

> Find the length of the longest common subsequence of two strings.

**Why this problem:** THE classic 2D DP problem. The pattern of comparing two sequences appears in Edit Distance, Shortest Common Supersequence, and many others.

**Framework:**
1. **State:** `dp[i][j]` = length of LCS of `text1[0..i-1]` and `text2[0..j-1]`
2. **Recurrence:**
   - If `text1[i-1] === text2[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1` (both characters match, extend LCS)
   - Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (skip one character from either string)
3. **Base case:** `dp[0][j] = 0`, `dp[i][0] = 0` (LCS with empty string is 0)
4. **Answer:** `dp[m][n]`

```typescript
function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    const dp: number[][] = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}
```

**Dry run:**
```
text1 = "abcde", text2 = "ace"

    ""  a  c  e
""   0  0  0  0
a    0  1  1  1
b    0  1  1  1
c    0  1  2  2
d    0  1  2  2
e    0  1  2  3

LCS = 3 ("ace") ✓
```

**The two-sequence DP pattern:** Whenever you're comparing or combining two strings/arrays, think of a 2D table where `dp[i][j]` represents the answer for prefixes of length `i` and `j`.

---

### Problem 1.9: Edit Distance
**LeetCode #72 — Hard**

> Find the minimum number of operations (insert, delete, replace) to convert `word1` to `word2`.

**Why this problem:** Widely considered one of the most important DP problems. Same structure as LCS but with three operations.

```typescript
function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
    const dp: number[][] = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    // Base cases:
    // Converting word1[0..i-1] to "" requires i deletions
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    // Converting "" to word2[0..j-1] requires j insertions
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // Characters match — no operation needed
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // delete from word1
                    dp[i][j - 1],      // insert into word1
                    dp[i - 1][j - 1]   // replace in word1
                );
            }
        }
    }

    return dp[m][n];
}
```

**Dry run:**
```
word1 = "horse", word2 = "ros"

    ""  r  o  s
""   0  1  2  3
h    1  1  2  3
o    2  2  1  2
r    3  2  2  2
s    4  3  3  2
e    5  4  4  3

Answer: 3 (horse → rorse → rose → ros) ✓
```

---

### Category C: Knapsack Problems

Knapsack problems are so common they deserve their own category. The pattern: you have items with values/weights and a capacity constraint.

---

### Problem 1.10: Partition Equal Subset Sum (0/1 Knapsack)
**LeetCode #416 — Medium**

> Can you partition an array into two subsets with equal sums?

**Key insight:** This is equivalent to: "Is there a subset that sums to `totalSum / 2`?" — a classic 0/1 knapsack.

```typescript
function canPartition(nums: number[]): boolean {
    const totalSum = nums.reduce((a, b) => a + b, 0);

    // If total sum is odd, can't split equally
    if (totalSum % 2 !== 0) return false;

    const target = totalSum / 2;

    // dp[j] = can we form sum j using some subset of elements?
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // empty subset sums to 0

    for (const num of nums) {
        // Traverse BACKWARDS to avoid using the same element twice
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
            // dp[j] stays true if it was already achievable,
            // OR becomes true if (j - num) was achievable
            // (meaning we include this num)
        }
    }

    return dp[target];
}
```

**Why traverse backwards?**
If we go forwards, `dp[j - num]` might already reflect the current element being included. Going backwards ensures each element is used at most once (0/1 property). For unbounded knapsack (items can be reused), go forwards.

**Dry run:**
```
nums = [1, 5, 11, 5], total = 22, target = 11

dp = [T, F, F, F, F, F, F, F, F, F, F, F]

num=1:  dp[1] = dp[1]||dp[0] = T
        dp = [T, T, F, F, F, F, F, F, F, F, F, F]

num=5:  dp[6] = dp[6]||dp[1] = T
        dp[5] = dp[5]||dp[0] = T
        dp = [T, T, F, F, F, T, T, F, F, F, F, F]

num=11: dp[11] = dp[11]||dp[0] = T  ← found it!

Return true ✓
```

---

### Problem 1.11: Target Sum
**LeetCode #494 — Medium**

> Assign `+` or `-` to each number to reach a target sum. Count the number of ways.

**Why this problem:** Another knapsack variant in disguise.

**Mathematical transformation:**
- Let P = sum of positive numbers, N = sum of negative numbers
- P - N = target, P + N = totalSum
- So P = (target + totalSum) / 2
- Problem becomes: "count subsets that sum to P"

```typescript
function findTargetSumWays(nums: number[], target: number): number {
    const totalSum = nums.reduce((a, b) => a + b, 0);

    // Edge cases
    if ((target + totalSum) % 2 !== 0) return 0;
    if (Math.abs(target) > totalSum) return 0;

    const subsetSum = (target + totalSum) / 2;

    // dp[j] = number of ways to form sum j
    const dp = new Array(subsetSum + 1).fill(0);
    dp[0] = 1; // one way to form sum 0 (empty subset)

    for (const num of nums) {
        for (let j = subsetSum; j >= num; j--) {
            dp[j] += dp[j - num]; // add ways that include this num
        }
    }

    return dp[subsetSum];
}
```

---

### Problem 1.12: Coin Change II (Unbounded Knapsack)
**LeetCode #518 — Medium**

> Count the number of combinations that make up an amount, using coins with unlimited supply.

**Contrast with Coin Change I:** Problem I asks for minimum coins (optimization). Problem II asks for number of combinations (counting).

**Contrast with 0/1 knapsack:** Here coins can be reused, so inner loop goes **forwards**.

```typescript
function change(amount: number, coins: number[]): number {
    // dp[j] = number of combinations to make amount j
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1; // one way to make amount 0

    // IMPORTANT: iterate coins in the outer loop to avoid counting
    // permutations (e.g., [1,2] and [2,1] as different)
    for (const coin of coins) {
        for (let j = coin; j <= amount; j++) {
            dp[j] += dp[j - coin];
        }
    }

    return dp[amount];
}
```

**Why outer loop over coins?**
If we loop over amounts in the outer loop and coins in the inner loop, we'd count `[1,2]` and `[2,1]` as separate ways (that gives permutations, not combinations). By processing one coin at a time, we ensure coins are considered in order, giving combinations.

---

### Knapsack Summary

| Variant | Item Reuse | Inner Loop Direction | Example |
|---|---|---|---|
| 0/1 Knapsack | Each item once | **Backwards** | Partition Equal Subset Sum |
| Unbounded Knapsack | Unlimited | **Forwards** | Coin Change, Coin Change II |
| Counting ways | — | Same as above | Target Sum, Coin Change II |
| Optimization | — | Same as above | Coin Change I, Knapsack |

---

### Category D: DP on Strings (Palindromes)

---

### Problem 1.13: Longest Palindromic Substring
**LeetCode #5 — Medium**

> Find the longest palindromic substring.

**Why this problem:** Extremely common interview question. The "expand around center" approach is O(n²) and often preferred over the DP approach.

```typescript
// Approach 1: Expand Around Center (preferred in interviews)
function longestPalindrome(s: string): string {
    let start = 0;
    let maxLength = 0;

    function expandAroundCenter(left: number, right: number): void {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const length = right - left + 1;
            if (length > maxLength) {
                start = left;
                maxLength = length;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // odd-length palindromes
        expandAroundCenter(i, i + 1); // even-length palindromes
    }

    return s.substring(start, start + maxLength);
}

// Approach 2: DP
function longestPalindromeDP(s: string): string {
    const n = s.length;

    // dp[i][j] = true if s[i..j] is a palindrome
    const dp: boolean[][] = Array.from(
        { length: n },
        () => new Array(n).fill(false)
    );

    let start = 0;
    let maxLength = 1;

    // Every single character is a palindrome
    for (let i = 0; i < n; i++) dp[i][i] = true;

    // Check length 2
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLength = 2;
        }
    }

    // Check lengths 3 and above
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;

            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                if (len > maxLength) {
                    start = i;
                    maxLength = len;
                }
            }
        }
    }

    return s.substring(start, start + maxLength);
}
```

---

### Problem 1.14: Palindromic Substrings
**LeetCode #647 — Medium**

> Count the number of palindromic substrings.

```typescript
function countSubstrings(s: string): number {
    let count = 0;

    function expandAroundCenter(left: number, right: number): void {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // odd-length
        expandAroundCenter(i, i + 1); // even-length
    }

    return count;
}
```

---

### Category E: Decision-Making DP

Problems where at each step you make a choice from multiple options and track state across decisions.

---

### Problem 1.15: Best Time to Buy and Sell Stock with Cooldown
**LeetCode #309 — Medium**

> Buy and sell stocks with a 1-day cooldown after selling. Maximize profit.

**Why this problem:** Teaches state machine DP — tracking which "state" you're in (holding, sold, cooldown).

```typescript
function maxProfit(prices: number[]): number {
    const n = prices.length;
    if (n <= 1) return 0;

    // Three states:
    // hold[i]  = max profit on day i if we're holding a stock
    // sold[i]  = max profit on day i if we just sold
    // rest[i]  = max profit on day i if we're resting (cooldown or idle)

    let hold = -prices[0]; // bought on day 0
    let sold = 0;
    let rest = 0;

    for (let i = 1; i < n; i++) {
        const prevHold = hold;
        const prevSold = sold;
        const prevRest = rest;

        hold = Math.max(prevHold, prevRest - prices[i]);  // keep holding OR buy today (must have rested yesterday)
        sold = prevHold + prices[i];                       // sell today (must have been holding)
        rest = Math.max(prevRest, prevSold);               // do nothing OR was in cooldown
    }

    return Math.max(sold, rest); // can't end in "hold" state for max profit
}
```

**State machine visualization:**
```
         buy
  REST ------→ HOLD
   ↑              |
   | cooldown     | sell
   |              ↓
  SOLD ←-----  (sold)
```

---

### DP Category Summary & Problem Selection Guide

```
"How many ways to reach target?"     → Counting DP (often knapsack)
"Minimum cost / maximum value"       → Optimization DP
"Can it be done?"                    → Boolean DP
"Longest/shortest subsequence"       → Two-sequence or 1D DP
"Palindrome substring/subsequence"   → Expand around center or interval DP
"Stock buy/sell with rules"          → State machine DP
"Grid path problems"                 → 2D DP
"String segmentation"               → 1D DP checking all splits
"Using items with capacity"          → Knapsack DP
```

---

### More DP Problems to Practice

| # | Problem | Category |
|---|---|---|
| 746 | Min Cost Climbing Stairs | 1D linear |
| 213 | House Robber II | 1D with circular constraint |
| 152 | Maximum Product Subarray | 1D tracking min and max |
| 64 | Minimum Path Sum | 2D grid |
| 97 | Interleaving String | 2D two-sequence |
| 1049 | Last Stone Weight II | 0/1 knapsack |
| 377 | Combination Sum IV | Unbounded (permutations) |
| 516 | Longest Palindromic Subsequence | 2D interval |
| 312 | Burst Balloons | Interval DP (hard) |
| 188 | Best Time to Buy Sell Stock IV | State machine with k |

---

---

## Topic 2: Backtracking

### Why This Matters

Backtracking generates **all valid combinations, permutations, or subsets** that satisfy certain constraints. It's essentially DFS on a **decision tree** where you explore a branch, and if it doesn't work out, you undo your choice and try another. If DP finds THE optimal answer, backtracking finds ALL answers.

### The Backtracking Template

Every backtracking problem follows this exact structure:

```typescript
function backtrack(
    candidates: any[],   // the choices available
    path: any[],          // the current partial solution
    result: any[][],      // collection of all valid solutions
    start: number,        // where to start picking (for combinations)
    /* ...other state */
): void {
    // 1. BASE CASE: is the current path a valid complete solution?
    if (isComplete(path)) {
        result.push([...path]); // MUST copy the path
        return;
    }

    // 2. EXPLORE: try each candidate
    for (let i = start; i < candidates.length; i++) {
        // 3. PRUNE: skip invalid choices early
        if (!isValid(candidates[i])) continue;

        // 4. CHOOSE: add candidate to path
        path.push(candidates[i]);

        // 5. EXPLORE: recurse with the choice made
        backtrack(candidates, path, result, i + /* 0 or 1 */, ...);

        // 6. UN-CHOOSE: remove candidate from path (backtrack!)
        path.pop();
    }
}
```

### The Key Distinctions

| Problem Type | Duplicates in Input? | Reuse Elements? | Start Parameter | Extra Logic |
|---|---|---|---|---|
| Subsets | No | No | `i + 1` | — |
| Subsets II | Yes | No | `i + 1` | Sort + skip `nums[i]===nums[i-1]` |
| Permutations | No | No | Use `used[]` set | — |
| Permutations II | Yes | No | Use `used[]` set | Sort + skip duplicates |
| Combinations | No | No | `i + 1` | — |
| Combination Sum | No | Yes (reuse) | `i` (same element) | — |
| Combination Sum II | Yes | No | `i + 1` | Sort + skip duplicates |

---

### Problem 2.1: Subsets
**LeetCode #78 — Medium**

> Given a set of distinct integers, return all possible subsets.

**Why this problem:** The purest backtracking problem. Every valid path (including partial ones) is a solution.

```typescript
function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];

    function backtrack(start: number): void {
        // Every path is a valid subset — add it immediately
        result.push([...path]);

        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);       // choose
            backtrack(i + 1);          // explore (i+1: don't reuse)
            path.pop();                // un-choose
        }
    }

    backtrack(0);
    return result;
}
```

**Decision tree visualization:**
```
nums = [1, 2, 3]

                    []
            /        |        \
          [1]       [2]       [3]
        /    \       |
     [1,2]  [1,3]  [2,3]
       |
    [1,2,3]

Subsets collected: [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]
```

---

### Problem 2.2: Subsets II (With Duplicates)
**LeetCode #90 — Medium**

> Given a set of integers that might contain duplicates, return all possible unique subsets.

**The duplicate-skipping trick:** Sort first, then skip an element if it equals the previous one at the same decision level.

```typescript
function subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a, b) => a - b); // SORT FIRST
    const result: number[][] = [];
    const path: number[] = [];

    function backtrack(start: number): void {
        result.push([...path]);

        for (let i = start; i < nums.length; i++) {
            // Skip duplicates at the same decision level
            if (i > start && nums[i] === nums[i - 1]) continue;

            path.push(nums[i]);
            backtrack(i + 1);
            path.pop();
        }
    }

    backtrack(0);
    return result;
}
```

**Why `i > start` and not `i > 0`?**
We only skip if the duplicate is at the **same level** of the decision tree. `i > start` means "this isn't the first choice we're considering at this level." At a deeper level, using the same value is fine (e.g., `[1, 1]` is a valid subset if 1 appears twice).

---

### Problem 2.3: Permutations
**LeetCode #46 — Medium**

> Given a collection of distinct numbers, return all possible permutations.

**Key difference from subsets:** Order matters, so we can't use `start`. Instead, use a `used` set to track which elements are already in the current path.

```typescript
function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    const used = new Set<number>(); // track indices in use

    function backtrack(): void {
        // Base case: path has all elements → complete permutation
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        // Try every unused element at this position
        for (let i = 0; i < nums.length; i++) {
            if (used.has(i)) continue;

            path.push(nums[i]);
            used.add(i);

            backtrack();

            path.pop();
            used.delete(i);
        }
    }

    backtrack();
    return result;
}
```

**Decision tree for `[1, 2, 3]`:**
```
                         []
                /         |         \
              [1]        [2]        [3]
            /    \      /   \      /   \
         [1,2] [1,3] [2,1] [2,3] [3,1] [3,2]
          |      |     |     |     |     |
       [1,2,3][1,3,2][2,1,3][2,3,1][3,1,2][3,2,1]

6 permutations = 3! ✓
```

---

### Problem 2.4: Combination Sum
**LeetCode #39 — Medium**

> Find all unique combinations where candidate numbers sum to target. Each number can be used unlimited times.

```typescript
function combinationSum(
    candidates: number[],
    target: number
): number[][] {
    const result: number[][] = [];
    const path: number[] = [];

    function backtrack(start: number, remaining: number): void {
        if (remaining === 0) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // Pruning: skip if this candidate exceeds remaining
            if (candidates[i] > remaining) continue;

            path.push(candidates[i]);
            backtrack(i, remaining - candidates[i]); // i (not i+1): allow reuse
            path.pop();
        }
    }

    candidates.sort((a, b) => a - b); // sort for better pruning
    backtrack(0, target);
    return result;
}
```

---

### Problem 2.5: Combination Sum II (No Reuse, With Duplicates)
**LeetCode #40 — Medium**

> Same as Combination Sum but each number can only be used once, and candidates may contain duplicates.

```typescript
function combinationSum2(
    candidates: number[],
    target: number
): number[][] {
    candidates.sort((a, b) => a - b); // sort for duplicate handling
    const result: number[][] = [];
    const path: number[] = [];

    function backtrack(start: number, remaining: number): void {
        if (remaining === 0) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // Pruning: since sorted, all following will also be too big
            if (candidates[i] > remaining) break;

            // Skip duplicates at the same decision level
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            path.push(candidates[i]);
            backtrack(i + 1, remaining - candidates[i]); // i+1: no reuse
            path.pop();
        }
    }

    backtrack(0, target);
    return result;
}
```

---

### Problem 2.6: Word Search
**LeetCode #79 — Medium**

> Given a 2D board and a word, find if the word exists in the grid by moving horizontally or vertically to adjacent cells. Can't reuse the same cell.

**Why this problem:** Backtracking on a grid — DFS with undo.

```typescript
function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function backtrack(r: number, c: number, index: number): boolean {
        // Base case: matched all characters
        if (index === word.length) return true;

        // Boundary and matching checks
        if (
            r < 0 || r >= rows ||
            c < 0 || c >= cols ||
            board[r][c] !== word[index]
        ) {
            return false;
        }

        // Mark as visited (choose)
        const temp = board[r][c];
        board[r][c] = '#';

        // Explore all 4 directions
        for (const [dr, dc] of directions) {
            if (backtrack(r + dr, c + dc, index + 1)) {
                return true;
            }
        }

        // Un-mark (un-choose / backtrack)
        board[r][c] = temp;

        return false;
    }

    // Try starting from every cell
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (backtrack(r, c, 0)) return true;
        }
    }

    return false;
}
```

---

### Problem 2.7: Palindrome Partitioning
**LeetCode #131 — Medium**

> Partition a string such that every substring is a palindrome. Return all such partitionings.

**Why this problem:** Combines backtracking with a palindrome check. Demonstrates partitioning problems.

```typescript
function partition(s: string): string[][] {
    const result: string[][] = [];
    const path: string[] = [];

    function isPalindrome(str: string, left: number, right: number): boolean {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    function backtrack(start: number): void {
        // Base case: we've partitioned the entire string
        if (start === s.length) {
            result.push([...path]);
            return;
        }

        // Try every possible end position for the next partition
        for (let end = start; end < s.length; end++) {
            // Only proceed if the current substring is a palindrome
            if (isPalindrome(s, start, end)) {
                path.push(s.substring(start, end + 1));
                backtrack(end + 1);
                path.pop();
            }
        }
    }

    backtrack(0);
    return result;
}
```

**Dry run:**
```
s = "aab"

backtrack(0):
  end=0: "a" palindrome → path=["a"], backtrack(1)
    end=1: "a" palindrome → path=["a","a"], backtrack(2)
      end=2: "b" palindrome → path=["a","a","b"] ← COMPLETE ✓
    end=2: "ab" not palindrome → skip
  end=1: "aa" palindrome → path=["aa"], backtrack(2)
    end=2: "b" palindrome → path=["aa","b"] ← COMPLETE ✓
  end=2: "aab" not palindrome → skip

Result: [["a","a","b"], ["aa","b"]] ✓
```

---

### Problem 2.8: N-Queens
**LeetCode #51 — Hard**

> Place n queens on an n×n chessboard so no two queens threaten each other.

**Why this problem:** The classic backtracking problem. Tests constraint checking and systematic exploration.

```typescript
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const board: string[][] = Array.from(
        { length: n },
        () => new Array(n).fill('.')
    );

    // Track which columns and diagonals are under attack
    const cols = new Set<number>();
    const diag1 = new Set<number>();  // row - col (identifies \ diagonals)
    const diag2 = new Set<number>();  // row + col (identifies / diagonals)

    function backtrack(row: number): void {
        if (row === n) {
            // Convert board to the required format
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            // Check if this position is under attack
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            // Place queen
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            backtrack(row + 1);

            // Remove queen (backtrack)
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return result;
}
```

**Why `row - col` for `\` diagonals and `row + col` for `/` diagonals:**
- On any `\` diagonal, `row - col` is constant: `(0,0),(1,1),(2,2)` all have `row-col=0`
- On any `/` diagonal, `row + col` is constant: `(0,2),(1,1),(2,0)` all have `row+col=2`
- So these values uniquely identify each diagonal.

---

### Backtracking vs DP — When to Use Which

```
BACKTRACKING:                          DP:
- "Generate ALL solutions"             - "Count solutions" or "find optimal"
- Need the actual combinations         - Only need the number or value
- Decision tree exploration            - Filling a table
- n is small (≤ 15-20)                - n can be large
- Exponential time is acceptable       - Polynomial time needed
```

Sometimes they overlap: if a backtracking problem asks only for a count, converting to DP can dramatically speed it up.

---

### More Backtracking Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 77 | Combinations | Basic combination generation |
| 47 | Permutations II | Permutations with duplicates |
| 17 | Letter Combinations of Phone Number | Multi-source backtracking |
| 22 | Generate Parentheses | Constraint-based generation |
| 93 | Restore IP Addresses | String partitioning with constraints |
| 37 | Sudoku Solver | Heavy constraint checking (Hard) |

---

---

## Topic 3: Heaps / Priority Queues

### Why This Matters

Heaps provide efficient access to the minimum or maximum element. They're essential when you need to repeatedly extract the best/worst element, maintain a running top-K, or merge multiple sorted sources.

### Core Concepts to Master

**1. What is a heap?**
A complete binary tree where every parent is ≤ children (min-heap) or ≥ children (max-heap). Implemented as an array.

**2. Key operations and complexities:**

| Operation | Time |
|---|---|
| Insert (push) | O(log n) |
| Extract min/max (pop) | O(log n) |
| Peek at min/max | O(1) |
| Build heap from array | O(n) |

**3. TypeScript doesn't have a built-in heap.** You need to implement one or use a minimal implementation. In interviews, you can often explain "I'd use a min-heap here" and write the logic assuming heap operations are available. But knowing how to implement one is valuable.

### Minimal Heap Implementation

```typescript
class MinHeap {
    private heap: number[] = [];

    get size(): number {
        return this.heap.length;
    }

    peek(): number {
        return this.heap[0];
    }

    push(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop(): number {
        const min = this.heap[0];
        const last = this.heap.pop()!;

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }

        return min;
    }

    private bubbleUp(index: number): void {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] <= this.heap[index]) break;
            [this.heap[parent], this.heap[index]] =
                [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    private bubbleDown(index: number): void {
        const n = this.heap.length;

        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < n && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < n && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[smallest], this.heap[index]] =
                [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
}
```

For problems that need a max-heap, either negate values when inserting/extracting, or modify the comparisons.

```typescript
// Max-heap trick: negate values
const maxHeap = new MinHeap();
maxHeap.push(-5);  // insert 5
maxHeap.push(-3);  // insert 3
const max = -maxHeap.pop(); // extract max: 5
```

---

### Problem 3.1: Kth Largest Element in an Array
**LeetCode #215 — Medium**

> Find the kth largest element in an unsorted array.

**Why this problem:** The quintessential heap problem. Three approaches: sort (O(n log n)), min-heap of size k (O(n log k)), and quickselect (O(n) average).

```typescript
// Approach: Min-heap of size k
// Intuition: maintain a heap of the k largest elements.
// The smallest element in this heap is the kth largest overall.
function findKthLargest(nums: number[], k: number): number {
    const heap = new MinHeap();

    for (const num of nums) {
        heap.push(num);

        // If heap exceeds size k, remove the smallest
        if (heap.size > k) {
            heap.pop();
        }
    }

    // The smallest element among the k largest is the kth largest
    return heap.peek();
}
```

**Why a min-heap and not a max-heap?**
A min-heap of size k naturally evicts the smallest element when it overflows. What remains are the k largest elements, with the kth largest sitting at the top (the minimum of the k largest).

**Dry run:**
```
nums = [3, 2, 1, 5, 6, 4], k = 2

num=3: heap=[3]      (size 1 ≤ 2)
num=2: heap=[2,3]    (size 2 ≤ 2)
num=1: heap=[1,2,3]  (size 3 > 2) → pop 1 → heap=[2,3]
num=5: heap=[2,3,5]  (size 3 > 2) → pop 2 → heap=[3,5]
num=6: heap=[3,5,6]  (size 3 > 2) → pop 3 → heap=[5,6]
num=4: heap=[4,5,6]  (size 3 > 2) → pop 4 → heap=[5,6]

peek = 5 (2nd largest) ✓
```

---

### Problem 3.2: Top K Frequent Elements
**LeetCode #347 — Medium**

> Given an array, return the k most frequent elements.

```typescript
function topKFrequent(nums: number[], k: number): number[] {
    // Step 1: Count frequencies
    const freq = new Map<number, number>();
    for (const num of nums) {
        freq.set(num, (freq.get(num) ?? 0) + 1);
    }

    // Step 2: Use a min-heap of size k (by frequency)
    // Heap stores [frequency, number] pairs
    const heap = new MinHeapCustom<[number, number]>((a, b) => a[0] - b[0]);

    for (const [num, count] of freq) {
        heap.push([count, num]);
        if (heap.size > k) {
            heap.pop(); // remove least frequent
        }
    }

    // Step 3: Extract results
    const result: number[] = [];
    while (heap.size > 0) {
        result.push(heap.pop()![1]);
    }

    return result;
}

// Alternative: Bucket Sort approach — O(n) time!
function topKFrequentBucket(nums: number[], k: number): number[] {
    const freq = new Map<number, number>();
    for (const num of nums) {
        freq.set(num, (freq.get(num) ?? 0) + 1);
    }

    // Buckets: index = frequency, value = list of numbers with that frequency
    // Maximum possible frequency is nums.length
    const buckets: number[][] = Array.from(
        { length: nums.length + 1 },
        () => []
    );

    for (const [num, count] of freq) {
        buckets[count].push(num);
    }

    // Collect from highest frequency buckets
    const result: number[] = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }

    return result.slice(0, k);
}
```

---

### Problem 3.3: Find Median from Data Stream
**LeetCode #295 — Hard**

> Design a data structure that supports adding numbers and finding the median efficiently.

**Why this problem:** The classic two-heap technique. Extremely commonly asked.

**Key insight:** Maintain two heaps:
- **maxHeap** for the lower half (gives quick access to the largest of the lower half)
- **minHeap** for the upper half (gives quick access to the smallest of the upper half)

The median is at the boundary between the two heaps.

```typescript
class MedianFinder {
    private lowerHalf: MaxHeap;  // max-heap for smaller values
    private upperHalf: MinHeap;  // min-heap for larger values

    constructor() {
        this.lowerHalf = new MaxHeap();
        this.upperHalf = new MinHeap();
    }

    addNum(num: number): void {
        // Always add to lowerHalf first
        this.lowerHalf.push(num);

        // Ensure the max of lowerHalf ≤ min of upperHalf
        if (
            this.upperHalf.size > 0 &&
            this.lowerHalf.peek() > this.upperHalf.peek()
        ) {
            this.upperHalf.push(this.lowerHalf.pop());
        }

        // Balance sizes: lowerHalf can have at most 1 more element
        if (this.lowerHalf.size > this.upperHalf.size + 1) {
            this.upperHalf.push(this.lowerHalf.pop());
        } else if (this.upperHalf.size > this.lowerHalf.size) {
            this.lowerHalf.push(this.upperHalf.pop());
        }
    }

    findMedian(): number {
        if (this.lowerHalf.size > this.upperHalf.size) {
            return this.lowerHalf.peek();
        }
        return (this.lowerHalf.peek() + this.upperHalf.peek()) / 2;
    }
}
```

**Visual:**
```
Numbers added: 1, 5, 3, 2, 4

After 1:   lower=[1]       upper=[]         median=1
After 5:   lower=[1]       upper=[5]        median=(1+5)/2=3
After 3:   lower=[1]       upper=[3,5]      → rebalance
           lower=[1,3]     upper=[5]        median=3
After 2:   lower=[1,2,3]   upper=[5]        → rebalance
           lower=[1,2]     upper=[3,5]      median=(2+3)/2=2.5
After 4:   lower=[1,2]     upper=[3,4,5]    → rebalance
           lower=[1,2,3]   upper=[4,5]      median=3
```

---

### Problem 3.4: Merge K Sorted Lists
**LeetCode #23 — Hard**

> Merge k sorted linked lists into one sorted list.

**Why this problem:** Demonstrates using a heap to efficiently merge multiple sorted sources — a pattern also used in external sorting and stream processing.

```typescript
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    // Min-heap comparing node values
    const heap = new MinHeapCustom<ListNode>((a, b) => a.val - b.val);

    // Add the head of each list to the heap
    for (const head of lists) {
        if (head !== null) {
            heap.push(head);
        }
    }

    const dummy = new ListNode(0);
    let current = dummy;

    while (heap.size > 0) {
        // Extract the smallest node
        const smallest = heap.pop()!;
        current.next = smallest;
        current = current.next;

        // If this node has a next, add it to the heap
        if (smallest.next !== null) {
            heap.push(smallest.next);
        }
    }

    return dummy.next;
}
```

**Why this is O(N log k):**
- N = total number of nodes across all lists
- At any time, the heap has at most k elements (one from each list)
- Each of the N nodes is pushed and popped once: each operation is O(log k)
- Total: O(N log k)

---

### Problem 3.5: Task Scheduler
**LeetCode #621 — Medium**

> Schedule tasks with a cooldown period `n`. Same task must be at least `n` intervals apart. Find minimum intervals to finish all tasks.

**Why this problem:** Greedy + heap. Always schedule the most frequent remaining task.

```typescript
function leastInterval(tasks: string[], n: number): number {
    // Count frequencies
    const freq = new Array(26).fill(0);
    const aCode = 'A'.charCodeAt(0);

    for (const task of tasks) {
        freq[task.charCodeAt(0) - aCode]++;
    }

    // Greedy/math approach (most elegant)
    // The most frequent task determines the structure
    const maxFreq = Math.max(...freq);
    const maxFreqCount = freq.filter(f => f === maxFreq).length;

    // Minimum intervals = (maxFreq - 1) * (n + 1) + maxFreqCount
    // But it can't be less than the total number of tasks
    const formulaResult = (maxFreq - 1) * (n + 1) + maxFreqCount;

    return Math.max(formulaResult, tasks.length);
}
```

**Why the formula works:**
```
Tasks: A A A B B B, n = 2

maxFreq = 3 (both A and B), maxFreqCount = 2

Layout:
A B _ | A B _ | A B
 (n+1)  (n+1)  (last group: maxFreqCount)

(maxFreq-1) × (n+1) + maxFreqCount = 2 × 3 + 2 = 8

A B _ A B _ A B → 8 intervals ✓
```

---

### Problem 3.6: K Closest Points to Origin
**LeetCode #973 — Medium**

> Find the k closest points to the origin (0, 0).

```typescript
function kClosest(points: number[][], k: number): number[][] {
    // Max-heap of size k (by distance)
    // Keep track of the k smallest distances
    const heap = new MaxHeapCustom<[number, number[]]>(
        (a, b) => a[0] - b[0]
    );

    for (const point of points) {
        const dist = point[0] * point[0] + point[1] * point[1];
        heap.push([dist, point]);

        if (heap.size > k) {
            heap.pop(); // remove the farthest among our candidates
        }
    }

    const result: number[][] = [];
    while (heap.size > 0) {
        result.push(heap.pop()![1]);
    }

    return result;
}

// Alternative: just sort (simpler, O(n log n))
function kClosestSort(points: number[][], k: number): number[][] {
    return points
        .sort((a, b) =>
            (a[0] * a[0] + a[1] * a[1]) - (b[0] * b[0] + b[1] * b[1])
        )
        .slice(0, k);
}
```

---

### Heap Pattern Recognition Guide

```
"Kth largest/smallest"              → Min/Max heap of size k
"Top K elements"                    → Heap of size k
"Merge K sorted things"            → Min-heap with one element per source
"Running median"                    → Two heaps (max-heap + min-heap)
"Schedule by priority"              → Max-heap (process highest priority first)
"Continuously get min/max"          → Heap
"Closest/farthest K points"        → Heap of size k
```

---

### More Heap Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 703 | Kth Largest Element in Stream | Min-heap of size k |
| 1046 | Last Stone Weight | Max-heap simulation |
| 355 | Design Twitter | Merge K feeds with heap |
| 767 | Reorganize String | Max-heap greedy placement |
| 1642 | Furthest Building You Can Reach | Min-heap for resource allocation |
| 778 | Swim in Rising Water | Modified Dijkstra / heap BFS |

---

---

## Topic 4: Advanced Graphs

### Why This Matters

Phase 2 covered BFS, DFS, and basic topological sort. Phase 3 adds the remaining graph algorithms you need for interviews: **Union-Find** for dynamic connectivity, **Dijkstra's** for weighted shortest paths, and more sophisticated applications of the tools you already know.

### Core Concepts to Master

**1. Union-Find (Disjoint Set Union):** Efficiently groups elements and checks connectivity.
**2. Dijkstra's Algorithm:** Shortest path in weighted graphs with non-negative weights.
**3. Advanced BFS/DFS patterns:** Multi-state BFS, BFS with priority queues.

---

### Union-Find (Disjoint Set Union)

**When to use Union-Find:**
- "Are these two nodes connected?" with ongoing merges
- "How many connected components?"
- "Detect a cycle" in an undirected graph
- "Redundant connection" — find the edge that creates a cycle
- "Accounts merge" — group by shared attributes
- Any problem where you dynamically merge groups and query membership

**Two optimizations that make it nearly O(1) per operation:**
1. **Path compression:** When finding root, make every node point directly to root
2. **Union by rank:** Attach shorter tree under taller tree

```typescript
class UnionFind {
    parent: number[];
    rank: number[];
    components: number;

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.components = n;
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // path compression
        }
        return this.parent[x];
    }

    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false; // already connected

        // Union by rank: attach smaller tree under larger tree
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        this.components--;
        return true;
    }

    connected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
}
```

**Amortized complexity:** O(α(n)) per operation, where α is the inverse Ackermann function — effectively O(1) for all practical input sizes.

---

### Problem 4.1: Number of Connected Components (Union-Find)
**LeetCode #323 — Medium (Premium) / Common Pattern**

> Given n nodes and a list of undirected edges, find the number of connected components.

```typescript
function countComponents(n: number, edges: number[][]): number {
    const uf = new UnionFind(n);

    for (const [u, v] of edges) {
        uf.union(u, v);
    }

    return uf.components;
}
```

This is also solvable with DFS/BFS, but Union-Find is more elegant and handles streaming edges.

---

### Problem 4.2: Redundant Connection
**LeetCode #684 — Medium**

> A tree of n nodes has one extra edge, creating exactly one cycle. Find the edge that can be removed to restore the tree.

**Why this problem:** Perfect Union-Find application. When adding an edge connects two already-connected nodes, that edge creates the cycle.

```typescript
function findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length;
    const uf = new UnionFind(n + 1); // nodes are 1-indexed

    for (const [u, v] of edges) {
        // If u and v are already connected, this edge creates a cycle
        if (!uf.union(u, v)) {
            return [u, v];
        }
    }

    return []; // shouldn't reach here
}
```

---

### Problem 4.3: Accounts Merge
**LeetCode #721 — Medium**

> Given accounts where each account has a name and list of emails, merge accounts that share any email.

**Why this problem:** A non-trivial Union-Find application. Emails are the elements to union, and you group them by shared ownership.

```typescript
function accountsMerge(accounts: string[][]): string[][] {
    const uf = new UnionFind(accounts.length);

    // Map each email to the account index it first appeared in
    const emailToAccount = new Map<string, number>();

    for (let i = 0; i < accounts.length; i++) {
        for (let j = 1; j < accounts[i].length; j++) {
            const email = accounts[i][j];

            if (emailToAccount.has(email)) {
                // This email was seen in another account — merge them
                uf.union(i, emailToAccount.get(email)!);
            } else {
                emailToAccount.set(email, i);
            }
        }
    }

    // Group emails by their root account
    const rootToEmails = new Map<number, Set<string>>();

    for (const [email, accountIdx] of emailToAccount) {
        const root = uf.find(accountIdx);

        if (!rootToEmails.has(root)) {
            rootToEmails.set(root, new Set());
        }
        rootToEmails.get(root)!.add(email);
    }

    // Build result
    const result: string[][] = [];

    for (const [root, emails] of rootToEmails) {
        const sortedEmails = [...emails].sort();
        result.push([accounts[root][0], ...sortedEmails]);
    }

    return result;
}
```

---

### Problem 4.4: Graph Valid Tree
**LeetCode #261 — Medium (Premium) / Common Pattern**

> Given n nodes and edges, determine if they form a valid tree.

**Key insight:** A valid tree has exactly `n-1` edges and is fully connected (one component, no cycles).

```typescript
function validTree(n: number, edges: number[][]): boolean {
    // A tree with n nodes has exactly n-1 edges
    if (edges.length !== n - 1) return false;

    const uf = new UnionFind(n);

    for (const [u, v] of edges) {
        // If union returns false, nodes were already connected → cycle
        if (!uf.union(u, v)) return false;
    }

    // Check if all nodes are in one component
    return uf.components === 1;
}
```

---

### Dijkstra's Algorithm

**When to use Dijkstra's:**
- Shortest path in a **weighted graph** with **non-negative weights**
- "Cheapest flights," "network delay time," "minimum cost path"
- Whenever BFS is insufficient because edges have different weights

**How it works:**
1. Start with source distance = 0, all others = ∞
2. Use a min-heap to always process the node with the smallest known distance
3. For each processed node, update (relax) distances to its neighbors
4. Skip nodes that have already been processed with a shorter distance

**Key difference from BFS:** BFS works for unweighted graphs because all edges cost 1. Dijkstra generalizes this with a priority queue that always processes the nearest unvisited node.

```typescript
function dijkstra(
    graph: [number, number][][], // graph[u] = [[v, weight], ...]
    source: number,
    n: number
): number[] {
    const dist = new Array(n).fill(Infinity);
    dist[source] = 0;

    // Min-heap: [distance, node]
    const heap = new MinHeapCustom<[number, number]>((a, b) => a[0] - b[0]);
    heap.push([0, source]);

    while (heap.size > 0) {
        const [d, u] = heap.pop()!;

        // If we've already found a shorter path to u, skip
        if (d > dist[u]) continue;

        // Relax all edges from u
        for (const [v, weight] of graph[u]) {
            const newDist = dist[u] + weight;

            if (newDist < dist[v]) {
                dist[v] = newDist;
                heap.push([newDist, v]);
            }
        }
    }

    return dist;
}
```

**Complexity:** O((V + E) log V) with a binary heap.

---

### Problem 4.5: Network Delay Time
**LeetCode #743 — Medium**

> Given a network of n nodes and weighted directed edges, send a signal from node k. Return the time it takes for all nodes to receive the signal, or -1 if impossible.

**Why this problem:** The most direct application of Dijkstra's algorithm.

```typescript
function networkDelayTime(
    times: number[][],
    n: number,
    k: number
): number {
    // Build adjacency list
    const graph: [number, number][][] = Array.from(
        { length: n + 1 },
        () => []
    );

    for (const [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    // Run Dijkstra from source k
    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    const heap = new MinHeapCustom<[number, number]>((a, b) => a[0] - b[0]);
    heap.push([0, k]);

    while (heap.size > 0) {
        const [d, u] = heap.pop()!;

        if (d > dist[u]) continue;

        for (const [v, weight] of graph[u]) {
            const newDist = dist[u] + weight;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                heap.push([newDist, v]);
            }
        }
    }

    // Answer is the maximum distance (last node to receive signal)
    let maxDist = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1; // unreachable node
        maxDist = Math.max(maxDist, dist[i]);
    }

    return maxDist;
}
```

---

### Problem 4.6: Cheapest Flights Within K Stops
**LeetCode #787 — Medium**

> Find the cheapest price from `src` to `dst` with at most `k` stops.

**Why this problem:** Can't use standard Dijkstra because of the stop constraint. Use a modified BFS/Bellman-Ford approach.

```typescript
// Modified BFS approach (Bellman-Ford style with K+1 iterations)
function findCheapestPrice(
    n: number,
    flights: number[][],
    src: number,
    dst: number,
    k: number
): number {
    // dist[i] = cheapest price to reach node i
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    // Relax all edges up to k+1 times (k stops = k+1 edges)
    for (let i = 0; i <= k; i++) {
        // Use a COPY to avoid using updates from the same iteration
        const temp = [...dist];

        for (const [u, v, price] of flights) {
            if (dist[u] !== Infinity && dist[u] + price < temp[v]) {
                temp[v] = dist[u] + price;
            }
        }

        dist = temp;
    }

    return dist[dst] === Infinity ? -1 : dist[dst];
}
```

**Why copy the distance array?**
Without copying, if we update `dist[v]` in the same iteration that `dist[u]` was just updated, we might use more edges (stops) than allowed. The copy ensures each iteration only adds one edge to existing paths.

---

### Problem 4.7: Min Cost to Connect All Points (Prim's / Kruskal's)
**LeetCode #1584 — Medium**

> Given points on a plane, connect all points with minimum total Manhattan distance (Minimum Spanning Tree).

```typescript
// Prim's Algorithm with min-heap
function minCostConnectPoints(points: number[][]): number {
    const n = points.length;
    const visited = new Set<number>();
    let totalCost = 0;

    // Min-heap: [cost, pointIndex]
    const heap = new MinHeapCustom<[number, number]>((a, b) => a[0] - b[0]);
    heap.push([0, 0]); // start from point 0

    while (visited.size < n) {
        const [cost, u] = heap.pop()!;

        if (visited.has(u)) continue;

        visited.add(u);
        totalCost += cost;

        // Add edges to all unvisited points
        for (let v = 0; v < n; v++) {
            if (!visited.has(v)) {
                const dist =
                    Math.abs(points[u][0] - points[v][0]) +
                    Math.abs(points[u][1] - points[v][1]);
                heap.push([dist, v]);
            }
        }
    }

    return totalCost;
}

// Kruskal's Algorithm with Union-Find
function minCostConnectPointsKruskal(points: number[][]): number {
    const n = points.length;
    const edges: [number, number, number][] = []; // [cost, u, v]

    // Generate all edges
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist =
                Math.abs(points[i][0] - points[j][0]) +
                Math.abs(points[i][1] - points[j][1]);
            edges.push([dist, i, j]);
        }
    }

    // Sort edges by cost
    edges.sort((a, b) => a[0] - b[0]);

    // Add edges greedily, skipping those that create cycles
    const uf = new UnionFind(n);
    let totalCost = 0;
    let edgesUsed = 0;

    for (const [cost, u, v] of edges) {
        if (uf.union(u, v)) {
            totalCost += cost;
            edgesUsed++;
            if (edgesUsed === n - 1) break; // MST complete
        }
    }

    return totalCost;
}
```

**Prim's vs Kruskal's:**
- **Prim's:** Grow the MST from a starting node. Better for dense graphs. O(E log V).
- **Kruskal's:** Sort all edges, add cheapest that doesn't create a cycle. Better for sparse graphs. O(E log E).

---

### Problem 4.8: Swim in Rising Water
**LeetCode #778 — Hard**

> Find the minimum time `t` such that you can swim from top-left to bottom-right, where at time `t` you can swim through any cell with elevation ≤ t.

**Why this problem:** Modified Dijkstra on a grid. The "cost" of a path is the maximum elevation along it (not the sum).

```typescript
function swimInWater(grid: number[][]): number {
    const n = grid.length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    // Min-heap: [max elevation on path so far, row, col]
    const heap = new MinHeapCustom<[number, number, number]>(
        (a, b) => a[0] - b[0]
    );
    heap.push([grid[0][0], 0, 0]);

    const visited = Array.from(
        { length: n },
        () => new Array(n).fill(false)
    );
    visited[0][0] = true;

    while (heap.size > 0) {
        const [maxElev, r, c] = heap.pop()!;

        if (r === n - 1 && c === n - 1) return maxElev;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 && nr < n &&
                nc >= 0 && nc < n &&
                !visited[nr][nc]
            ) {
                visited[nr][nc] = true;
                heap.push([Math.max(maxElev, grid[nr][nc]), nr, nc]);
            }
        }
    }

    return -1;
}
```

---

### Advanced Graph Decision Guide

```
"Shortest path, unweighted"          → BFS
"Shortest path, weighted (≥0)"      → Dijkstra
"Shortest path with limited edges"  → Bellman-Ford
"Minimum spanning tree"              → Prim's or Kruskal's
"Dynamic connectivity"              → Union-Find
"Cycle detection (undirected)"      → Union-Find or DFS
"Cycle detection (directed)"        → 3-color DFS or topological sort
"Is it a tree?"                      → n-1 edges + connected
"Merge groups / shared attributes"  → Union-Find
"Minimum bottleneck path"           → Modified Dijkstra (max instead of sum)
```

---

### More Advanced Graph Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 127 | Word Ladder | BFS shortest transformation |
| 269 | Alien Dictionary | Topological sort from constraints (Hard) |
| 332 | Reconstruct Itinerary | Eulerian path / DFS (Hard) |
| 1168 | Optimize Water Distribution | MST with virtual node |
| 1631 | Path With Minimum Effort | Modified Dijkstra / binary search + BFS |
| 547 | Number of Provinces | Union-Find or DFS |
| 399 | Evaluate Division | Weighted Union-Find or BFS |

---

---

## Phase 3: Putting It All Together

### Week 6 Daily Schedule — Dynamic Programming

| Day | Focus | Problems |
|---|---|---|
| Day 1 | 1D DP fundamentals | #70 Climbing Stairs, #198 House Robber, #746 Min Cost Climbing Stairs |
| Day 2 | 1D DP continued | #322 Coin Change, #139 Word Break, #91 Decode Ways |
| Day 3 | 1D DP advanced | #300 LIS, #152 Maximum Product Subarray, #213 House Robber II |
| Day 4 | 2D DP grids | #62 Unique Paths, #64 Minimum Path Sum, #63 Unique Paths II |
| Day 5 | 2D DP sequences | #1143 LCS, #72 Edit Distance |
| Day 6 | Knapsack problems | #416 Partition Equal Subset Sum, #494 Target Sum, #518 Coin Change II |
| Day 7 | DP review / palindromes | #5 Longest Palindromic Substring, #647 Palindromic Substrings, #309 Stock Cooldown |

### Week 7 Daily Schedule — Backtracking & Heaps

| Day | Focus | Problems |
|---|---|---|
| Day 8 | Backtracking fundamentals | #78 Subsets, #46 Permutations, #77 Combinations |
| Day 9 | Backtracking with duplicates | #90 Subsets II, #40 Combination Sum II, #47 Permutations II |
| Day 10 | Backtracking applications | #39 Combination Sum, #79 Word Search, #131 Palindrome Partitioning |
| Day 11 | Backtracking hard | #22 Generate Parentheses, #51 N-Queens, #17 Letter Combinations |
| Day 12 | Heaps fundamentals | #215 Kth Largest Element, #347 Top K Frequent, #703 Kth Largest in Stream |
| Day 13 | Heaps advanced | #23 Merge K Sorted Lists, #621 Task Scheduler, #973 K Closest Points |
| Day 14 | Heaps hard + review | #295 Find Median from Data Stream, #1046 Last Stone Weight |

### Week 8 Daily Schedule — Advanced Graphs & Integration

| Day | Focus | Problems |
|---|---|---|
| Day 15 | Union-Find | #323 Connected Components, #684 Redundant Connection, #261 Graph Valid Tree |
| Day 16 | Union-Find advanced | #721 Accounts Merge, #547 Number of Provinces |
| Day 17 | Dijkstra | #743 Network Delay Time, #787 Cheapest Flights Within K Stops |
| Day 18 | MST + advanced | #1584 Min Cost Connect All Points, #778 Swim in Rising Water |
| Day 19 | Mixed practice (DP + graphs) | #127 Word Ladder, #377 Combination Sum IV, #1631 Path Min Effort |
| Day 20 | Mixed practice (all topics) | #124 Binary Tree Max Path Sum, #84 Largest Rectangle Histogram, #76 Minimum Window Substring |
| Day 21 | Phase 3 assessment | Pick 4 unseen mediums and 1 hard, solve timed (30–35 min each) |

---

### Checklist Before Moving to Phase 4

- [ ] I can identify whether a problem needs DP and define: state, recurrence, base case
- [ ] I can distinguish between 0/1 knapsack and unbounded knapsack and write both
- [ ] I understand inner loop direction (forwards vs backwards) in knapsack problems
- [ ] I can write the backtracking template from memory and adapt it for subsets, permutations, and combinations
- [ ] I know when to sort + skip duplicates in backtracking problems
- [ ] I can implement a min-heap in TypeScript and use it to solve top-K and merge-K problems
- [ ] I understand the two-heap technique for running median
- [ ] I can implement Union-Find with path compression and union by rank
- [ ] I can write Dijkstra's algorithm and know when to use it vs BFS
- [ ] I know the difference between Prim's and Kruskal's for MST
- [ ] I can solve mixed problems by correctly identifying which pattern to apply
- [ ] I'm comfortable with problems rated Medium on LeetCode

---
