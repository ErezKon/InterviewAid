# 3528. Unit Conversion I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unit-conversion-i](https://leetcode.com/problems/unit-conversion-i)
**Companies:** Adobe

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

There are `n` types of units indexed from `0` to `n - 1`. You are given a 2D integer array `conversions` of length `n - 1`, where `conversions[i] = [sourceUnit_i, targetUnit_i, conversionFactor_i]`. This indicates that a single unit of type `sourceUnit_i` is equivalent to `conversionFactor_i` units of type `targetUnit_i`.

Return an array `baseUnitConversion` of length `n`, where `baseUnitConversion[i]` is the number of units of type `i` equivalent to a single unit of type 0. Since the answer may be large, return each `baseUnitConversion[i]` **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= n <= 10^5`
- `conversions.length == n - 1`
- `0 <= sourceUnit_i, targetUnit_i < n`
- `1 <= conversionFactor_i <= 10^9`
- It is guaranteed that unit 0 can be converted into any other unit through a **unique** combination of conversions without using any conversions in the opposite direction.

## Examples

**Example 1:**
```
Input: conversions = [[0,1,2],[1,2,3]]
Output: [1,2,6]
Explanation:
- Convert a single unit of type 0 into 2 units of type 1 using conversions[0].
- Convert a single unit of type 0 into 6 units of type 2 using conversions[0], then conversions[1].
```

**Example 2:**
```
Input: conversions = [[0,1,2],[0,2,3],[1,3,4],[1,4,5],[2,5,2],[4,6,3],[5,7,4]]
Output: [1,2,3,8,10,6,30,24]
Explanation:
- Convert a single unit of type 0 into 2 units of type 1 using conversions[0].
- Convert a single unit of type 0 into 3 units of type 2 using conversions[1].
- Convert a single unit of type 0 into 8 units of type 3 using conversions[0], then conversions[2].
- Convert a single unit of type 0 into 10 units of type 4 using conversions[0], then conversions[3].
- Convert a single unit of type 0 into 6 units of type 5 using conversions[1], then conversions[4].
- Convert a single unit of type 0 into 30 units of type 6 using conversions[0], conversions[3], then conversions[5].
- Convert a single unit of type 0 into 24 units of type 7 using conversions[1], conversions[4], then conversions[6].
```

## Approach
**Algorithm:** The guarantee (unit 0 reaches every unit through a unique chain of forward conversions, with exactly `n − 1` conversions) means the conversions form a **tree rooted at unit 0** with edges directed away from the root. If one unit of type 0 equals `ans[s]` units of type `s`, and one unit of `s` equals `w` units of `t`, then one unit of type 0 equals `ans[s] · w` units of `t`. So a single DFS/BFS from unit 0 propagates the products down the tree, taking everything modulo `10^9 + 7`. Use an explicit stack because the tree can be a chain of length `10^5`.

**Pseudocode:**
```text
FUNCTION baseUnitConversions(conversions):
    n ← LENGTH(conversions) + 1
    MOD ← 10^9 + 7
    children ← array of n empty lists
    FOR each [s, t, w] IN conversions:
        ADD (t, w) TO children[s]
    ans ← array of n zeros
    ans[0] ← 1
    stack ← [0]
    WHILE stack NOT EMPTY:
        u ← POP(stack)
        FOR (v, w) IN children[u]:
            ans[v] ← ans[u] * w MOD MOD
            PUSH(stack, v)
    RETURN ans
```

## Walkthrough
Example 2: `conversions = [[0,1,2],[0,2,3],[1,3,4],[1,4,5],[2,5,2],[4,6,3],[5,7,4]]`.

Children: `0 → {1:2, 2:3}`, `1 → {3:4, 4:5}`, `2 → {5:2}`, `4 → {6:3}`, `5 → {7:4}`.

| Step | Pop u | ans[u] | Updates | Stack after |
|------|-------|--------|---------|-------------|
| 1 | 0 | 1 | ans[1]=1·2=2, ans[2]=1·3=3 | [1, 2] |
| 2 | 2 | 3 | ans[5]=3·2=6 | [1, 5] |
| 3 | 5 | 6 | ans[7]=6·4=24 | [1, 7] |
| 4 | 7 | 24 | — | [1] |
| 5 | 1 | 2 | ans[3]=2·4=8, ans[4]=2·5=10 | [3, 4] |
| 6 | 4 | 10 | ans[6]=10·3=30 | [3, 6] |
| 7 | 6 | 30 | — | [3] |
| 8 | 3 | 8 | — | [] |

Output: `[1,2,3,8,10,6,30,24]`.

## Complexity Analysis
- **Time:** `O(n)` — every node and edge is visited once.
- **Space:** `O(n)` for the adjacency lists, the answer array and the stack.

## Follow-Up Questions
1. How would you answer queries "how many units of `b` equal one unit of `a`" for arbitrary `a`, `b`? (Answer `ans[b] · ans[a]^{-1} mod p` using the modular inverse via Fermat's little theorem, since `p` is prime and factors are non-zero mod `p`.)
2. What changes if conversions could be used in both directions and the graph might contain cycles? (Weighted union-find / graph traversal with consistency checks, as in Evaluate Division.)
3. Why must the traversal be iterative in Python/Java for this input size?

## Key Takeaway
A rooted conversion tree turns the problem into prefix products along root-to-node paths: one traversal from unit 0, multiplying by each edge factor modulo `10^9 + 7`, gives every answer in linear time.
