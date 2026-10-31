# 3715. Sum of Perfect Square Ancestors

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-perfect-square-ancestors](https://leetcode.com/problems/sum-of-perfect-square-ancestors)
**Companies:** Amazon, Google, Meesho

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given an integer `n` and an undirected tree rooted at node 0 with `n` nodes numbered from 0 to `n - 1`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates an undirected edge between nodes `u_i` and `v_i`.

You are also given an integer array `nums`, where `nums[i]` is the positive integer assigned to node `i`.

Define a value `t_i` as the number of **ancestors** of node `i` such that the product `nums[i] * nums[ancestor]` is a **perfect square**.

Return the sum of all `t_i` values for all nodes `i` in range `[1, n - 1]`.

**Note:**

- In a rooted tree, the **ancestors** of node `i` are all nodes on the path from node `i` to the root node 0, **excluding** `i` itself.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [u_i, v_i]`
- `0 <= u_i, v_i <= n - 1`
- `nums.length == n`
- `1 <= nums[i] <= 10^5`
- The input is generated such that `edges` represents a valid tree.

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2]], nums = [2,8,2]
Output: 3
Explanation:
- i = 1, ancestors [0]: nums[1] * nums[0] = 8 * 2 = 16 → perfect square → t_1 = 1
- i = 2, ancestors [1, 0]: nums[2] * nums[1] = 2 * 8 = 16, nums[2] * nums[0] = 2 * 2 = 4 → both perfect squares → t_2 = 2
Thus, the total number of valid ancestor pairs across all non-root nodes is 1 + 2 = 3.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[0,2]], nums = [1,2,4]
Output: 1
Explanation:
- i = 1, ancestors [0]: nums[1] * nums[0] = 2 * 1 = 2 → not a perfect square → t_1 = 0
- i = 2, ancestors [0]: nums[2] * nums[0] = 4 * 1 = 4 → perfect square → t_2 = 1
Thus, the total number of valid ancestor pairs across all non-root nodes is 1.
```

**Example 3:**
```
Input: n = 4, edges = [[0,1],[0,2],[1,3]], nums = [1,2,9,4]
Output: 2
Explanation:
- i = 1, ancestors [0]: 2 * 1 = 2 → not a perfect square → t_1 = 0
- i = 2, ancestors [0]: 9 * 1 = 9 → perfect square → t_2 = 1
- i = 3, ancestors [1, 0]: 4 * 2 = 8, 4 * 1 = 4 → only 4 is a perfect square → t_3 = 1
Thus, the total number of valid ancestor pairs across all non-root nodes is 0 + 1 + 1 = 2.
```

## Approach
**Key fact:** write every positive integer as `v = core(v) · s²`, where `core(v)` (the square-free kernel) is the product of the primes that appear with an odd exponent in `v`. Then `a · b` is a perfect square **iff** `core(a) = core(b)` (all prime exponents in the product must be even).

So `t_i` = number of ancestors of `i` whose value has the same core as `nums[i]`.
1. **Precompute cores** for all values up to `M = max(nums) ≤ 10^5` with a sieve: start with `core[v] = v`, and for every `p ≥ 2` with `p² ≤ M`, divide out `p²` from all multiples of `p²` as many times as possible.
2. **DFS from node 0** keeping `freq[c]` = number of nodes on the current root-to-node path (excluding the current node) whose core is `c`.
   - On entering node `u`: add `freq[core(nums[u])]` to the answer (these are exactly the qualifying ancestors), then increment it.
   - On leaving `u`: decrement it.
3. Use an iterative DFS (explicit stack with enter/exit markers) to avoid recursion-depth issues on path-shaped trees with `n = 10^5`.

The root contributes 0 automatically (empty path), matching the requirement to sum over `i ∈ [1, n − 1]`.

```text
FUNCTION sumOfAncestors(n, edges, nums)
    M ← max(nums)
    core ← array 0..M with core[v] ← v
    FOR p ← 2 WHILE p * p ≤ M
        FOR m ← p*p TO M STEP p*p
            WHILE core[m] MOD (p*p) = 0
                core[m] ← core[m] / (p*p)
    build adjacency list adj from edges
    freq ← map with default 0
    answer ← 0
    stack ← [(0, -1, ENTER)]
    WHILE stack not empty
        (u, parent, phase) ← POP stack
        c ← core[nums[u]]
        IF phase = EXIT
            freq[c] ← freq[c] - 1
            CONTINUE
        answer ← answer + freq[c]       // ancestors with the same core
        freq[c] ← freq[c] + 1
        PUSH (u, parent, EXIT)
        FOR v IN adj[u]
            IF v ≠ parent
                PUSH (v, u, ENTER)
    RETURN answer
```

## Walkthrough
Example 1: `n = 3`, `edges = [[0,1],[1,2]]`, `nums = [2,8,2]`.
Cores: `core(2) = 2`, `core(8) = core(2·2²) = 2`.

| Step | Event | core | freq[core] before | answer | freq after |
|------|-------|------|-------------------|--------|------------|
| 1 | enter 0 (2) | 2 | 0 | 0 | {2:1} |
| 2 | enter 1 (8) | 2 | 1 | 1 | {2:2} |
| 3 | enter 2 (2) | 2 | 2 | 3 | {2:3} |
| 4 | exit 2, 1, 0 | 2 | — | 3 | {2:0} |

`t_1 = 1` (8·2 = 16) and `t_2 = 2` (2·8 = 16, 2·2 = 4). Result: **3**.

## Complexity Analysis
Time: O(M log log M) for the core sieve (with M ≤ 10^5) plus O(n) for the DFS.
Space: O(M) for the core table and O(n) for the adjacency list, stack and frequency map.

## Follow-Up Questions
- How would you count pairs among **all** node pairs (not just ancestor–descendant) whose product is a perfect square? (Group by core and sum `C(cnt, 2)`.)
- What if the condition were "product is a perfect cube"? (Reduce exponents mod 3 to get a cube-free signature.)
- How would you handle values up to 10^12 where a sieve is impossible? (Factor by trial division up to the cube root plus square checks, or use Pollard's rho.)
- How would you support queries "count such ancestors for node `i` restricted to the nearest `d` ancestors"?

## Key Takeaway
"Product is a perfect square" reduces to "same square-free kernel", turning a pairwise number-theory check into an equality test; combined with a root-to-node frequency map maintained on DFS entry/exit, every node's ancestor count is obtained in O(1).
