# 2086. Minimum Number of Food Buckets to Feed the Hamsters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters](https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters)
**Companies:** Geico, Grab, Microsoft, Palo Alto Networks

---

## Problem Description

You are given a **0-indexed** string `hamsters` where `hamsters[i]` is either:

- `'H'` indicating that there is a hamster at index `i`, or
- `'.'` indicating that index `i` is empty.

You will add some number of food buckets at the empty indices in order to feed the hamsters. A hamster can be fed if there is at least one food bucket to its left or to its right. More formally, a hamster at index `i` can be fed if you place a food bucket at index `i - 1` **and/or** at index `i + 1`.

Return *the minimum number of food buckets you should **place at empty indices** to feed all the hamsters or *`-1`* if it is impossible to feed all of them*.

**Constraints:**
- `1 <= hamsters.length <= 10^5`
- `hamsters[i]` is either`'H'` or `'.'`.

## Examples

**Example 1:**
```
Input: hamsters = "H..H"
Output: 2
Explanation: We place two food buckets at indices 1 and 2.
It can be shown that if we place only one food bucket, one of the hamsters will not be fed.
```

**Example 2:**
```
Input: hamsters = ".H.H."
Output: 1
Explanation: We place one food bucket at index 2.
```

**Example 3:**
```
Input: hamsters = ".HHH."
Output: -1
Explanation: If we place a food bucket at every empty index as shown, the hamster at index 2 will not be able to eat.
```

## Approach

**Algorithm:** Greedy left-to-right placement

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
| Space  | **O(n)** – mutable copy of the string (can be in-place) |

## Follow-Up Questions

1. How would the algorithm change if a bucket could feed hamsters up to two cells away?
2. Can we compute the answer without modifying the string, using only counters?
3. What if the input already contains some buckets; how does that affect the greedy choice?

## Key Takeaway

Greedily placing a bucket on the rightmost available spot for each hamster yields the minimal number of buckets, because it maximally shares a bucket between consecutive hamsters.
