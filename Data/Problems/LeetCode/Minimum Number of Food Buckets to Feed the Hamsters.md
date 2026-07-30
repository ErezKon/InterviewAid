# 2086. Minimum Number of Food Buckets to Feed the Hamsters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters](https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters)
**Companies:** Geico, Grab, Microsoft, Palo Alto Networks

---

## Problem Description

You are given a string `hamsters` consisting of characters `'H'` (hamster), `'.'` (empty spot), and `'F'` (food bucket). Each hamster must have at least one adjacent food bucket (left or right). You may place a food bucket on any empty spot `'.'`. Return the minimum number of buckets needed to feed all hamsters, or `-1` if it is impossible.

Constraints:
- `1 ≤ len(hamsters) ≤ 10^5`
- The string contains only `'H'`, `'.'`, and `'F'`.

## Examples

**Example 1**
```
Input: hamsters = "H..H"
Output: 2
Explanation: Place buckets at positions 1 and 2 → "HF.FH" satisfies both hamsters.
```

**Example 2**
```
Input: hamsters = "HHH"
Output: -1
Explanation: No empty spot adjacent to the middle hamster, impossible to feed.
```

## Approach

**Algorithm:** Greedy left‑to‑right placement

Iterate through the string. When a hamster `'H'` is encountered:
1. If the left neighbor already has a bucket `'F'`, continue.
2. Otherwise, try to place a bucket on the right empty spot `'.'` (prefer right to also potentially feed the next hamster).
3. If the right spot is unavailable, try the left empty spot.
4. If neither side is empty, return `-1`.

```text
FUNCTION minimumBuckets(hamsters):
    s ← LIST(hamsters)          // mutable copy
    count ← 0
    FOR i ← 0 TO LEN(s)-1 DO
        IF s[i] = 'H' THEN
            // already fed by left bucket?
            IF i > 0 AND s[i-1] = 'F' THEN CONTINUE
            // try to place bucket on the right
            IF i+1 < LEN(s) AND s[i+1] = '.' THEN
                s[i+1] ← 'F'
                count ← count + 1
            // else try left side
            ELSE IF i > 0 AND s[i-1] = '.' THEN
                s[i-1] ← 'F'
                count ← count + 1
            ELSE
                RETURN -1
            END IF
        END IF
    END FOR
    RETURN count
```

## Walkthrough

| Index `i` | Character | Action | String after action | `count` |
|-----------|-----------|--------|----------------------|---------|
| 0 | H | right spot '.' → place `F` at 1 | `HF..H` | 1 |
| 3 | H | left spot '.' (index 2) is free → place `F` | `HF.FH` | 2 |

All hamsters now have an adjacent bucket.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n)** – single pass over the string |
| Space  | **O(n)** – mutable copy of the string (can be in‑place) |

## Follow‑Up Questions

1. How would the algorithm change if a bucket could feed hamsters up to two cells away?
2. Can we compute the answer without modifying the string, using only counters?
3. What if the input already contains some buckets; how does that affect the greedy choice?

## Key Takeaway

Greedily placing a bucket on the rightmost available spot for each hamster yields the minimal number of buckets, because it maximally shares a bucket between consecutive hamsters.
