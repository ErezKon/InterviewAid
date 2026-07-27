# 1111. Maximum Nesting Depth of Two Valid Parentheses Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings](https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings)
**Companies:** Bloomreach, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a valid parentheses string `seq`, split it into two subsequences `A` and `B` such that both are valid parentheses strings and `max(depth(A), depth(B))` is **minimized**.

Return an array `answer` where `answer[i] = 0` if `seq[i]` is assigned to `A`, and `1` if assigned to `B`.

**Constraints:**
- `1 <= seq.length <= 10^4`
- `seq` consists only of `'('` and `')'`
- `seq` is a valid parentheses string

---

## Examples

**Example 1:**
```
Input:  seq = "(()())"
Output: [0, 1, 1, 1, 1, 0]
Explanation: A = "()", B = "()()" → depth(A) = 1, depth(B) = 1, max = 1.
```

**Example 2:**
```
Input:  seq = "()(())()"
Output: [0, 0, 0, 1, 1, 0, 0, 0]
```

---

## Key Insight

> To minimize the max depth across two groups, **alternate by depth parity**: assign odd-depth parentheses to group 1 and even-depth to group 0. This evenly splits the nesting, halving the maximum depth.

```
Depth:    1   2   2   2   2   1
Char:     (   (   )   (   )   )
Group:    1   0   0   1   1   1   ← odd depth → group 1, even → group 0
```

---

## Approach

```
FUNCTION maxDepthAfterSplit(seq)
    result ← []
    depth ← 0

    FOR each c IN seq DO
        IF c = '(' THEN
            depth ← depth + 1
            APPEND (depth MOD 2) TO result
        ELSE
            APPEND (depth MOD 2) TO result
            depth ← depth - 1

    RETURN result
END FUNCTION
```

**Why assign before decrement for `)`?** The `)` closes at the current depth level, so it should be assigned to the same group as its matching `(`.

---

## Walkthrough

```
seq = "(()())"
```

| Index | Char | depth (after) | depth MOD 2 | Group |
|-------|------|---------------|-------------|-------|
| 0     | (    | 1             | 1           | 1     |
| 1     | (    | 2             | 0           | 0     |
| 2     | )    | 2→1           | 0           | 0     |
| 3     | (    | 2             | 0           | 0     |
| 4     | )    | 2→1           | 0           | 0     |
| 5     | )    | 1→0           | 1           | 1     |

- Group 0 (A): indices 1,2,3,4 → "()()" depth 1
- Group 1 (B): indices 0,5 → "()" depth 1
- **max(1, 1) = 1** ✅ (original depth was 2, halved to 1)

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(n)** — output array (O(1) extra) |

---

## Follow-Up Questions

1. **Why does parity-based splitting minimize max depth?**
   It distributes nested layers alternately, so each group gets roughly half the depth: `⌈depth/2⌉`.

2. **What if we split into K groups instead of 2?**
   Assign by `depth MOD K` — each group gets roughly `depth/K` nesting depth.

3. **Is the answer unique?**
   No — many valid splits exist. This approach gives one optimal solution.

---

## Key Takeaway

> **Parity-based depth splitting** evenly distributes nesting layers across two groups, minimizing the maximum depth — a simple O(n) greedy observation.
