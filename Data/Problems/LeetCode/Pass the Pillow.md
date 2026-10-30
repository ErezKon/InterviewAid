# 2582. Pass the Pillow

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/pass-the-pillow](https://leetcode.com/problems/pass-the-pillow)
**Companies:** Bloomberg, Google, Mathworks

---

## Problem Description
There are `n` people standing in a line labeled from `1` to `n`. The first person in the line is holding a pillow initially. Every second, the person holding the pillow passes it to the next person standing in the line. Once the pillow reaches the end of the line, the direction changes, and people continue passing the pillow in the opposite direction.

- For example, once the pillow reaches the `n`-th person they pass it to the `n - 1`-th person, then to the `n - 2`-th person and so on.

Given the two positive integers `n` and `time`, return *the index of the person holding the pillow after* `time` *seconds*.

**Constraints:**

- `2 <= n <= 1000`
- `1 <= time <= 1000`

**Note:** This question is the same as 3178: Find the Child Who Has the Ball After K Seconds.

## Examples

```
Example 1:
  Input: n = 4, time = 5
  Output: 2
  Explanation: People pass the pillow in the following way: 1 -> 2 -> 3 -> 4 -> 3 -> 2.
  After five seconds, the 2nd person is holding the pillow.
```

```
Example 2:
  Input: n = 3, time = 2
  Output: 3
  Explanation: People pass the pillow in the following way: 1 -> 2 -> 3.
  After two seconds, the 3rd person is holding the pillow.
```

## Approach
The movement forms a cycle of length `2*(n-1)`. Compute `time` modulo this cycle to find the position within one full back‑and‑forth traversal, then map it to the person index.

```text
FUNCTION passThePillow(n, time):
    SET cycle ← 2 * (n - 1)
    SET t ← time MOD cycle
    IF t < n:
        RETURN t + 1
    ELSE:
        RETURN 2 * n - 1 - t
```

## Walkthrough
For `n = 4, time = 5`:

| Step | t (time % cycle) | Condition | Result |
|------|-------------------|-----------|--------|
| cycle = 2*(4-1) = 6 |
| t = 5 % 6 = 5 |
| t < n? (5 < 4) → false |
| Return 2*4 - 1 - 5 = 8 - 1 - 5 = 2 |

Thus person `2` holds the pillow.

## Complexity Analysis
- **Time:** O(1) – only arithmetic operations.
- **Space:** O(1).

## Follow‑Up Questions
1. How would you modify the solution if the pillow moves at a variable speed (e.g., skips some people)?
2. What if the line is circular instead of reversing at the ends?
3. Can you compute the holder after each second for the first `k` seconds efficiently?

## Key Takeaway
The passing pattern repeats every `2*(n-1)` steps; using modular arithmetic yields the holder in constant time.
