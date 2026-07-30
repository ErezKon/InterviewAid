# 2582. Pass the Pillow

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Google, Mathworks

---

## Problem Description
There are `n` people standing in a line numbered from `1` to `n`. A pillow starts with person `1` and is passed to the next person each second. When it reaches either end of the line, the direction reverses. Given the total number of seconds `time`, return the index of the person holding the pillow after `time` seconds.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 4, time = 5` | `2` | The passing order is `1→2→3→4→3→2`. After 5 seconds person `2` holds the pillow. |
| `n = 3, time = 2` | `3` | Order: `1→2→3`. |
| `n = 5, time = 8` | `4` | Sequence: `1→2→3→4→5→4→3→2→1`. After 8 seconds person `4` holds it.

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
