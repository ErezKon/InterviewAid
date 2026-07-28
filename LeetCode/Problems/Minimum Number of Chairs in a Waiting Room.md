# 3168. Minimum Number of Chairs in a Waiting Room

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Expedia, Goldman Sachs

---

## Problem Description

You are given a string `s` consisting of characters `'E'` (person **enters**) and `'L'` (person **leaves**) describing the chronological order of people entering and leaving a waiting room. At any moment, the number of people inside the room is the number of `'E'` characters seen so far minus the number of `'L'` characters seen so far. Determine the minimum number of chairs required so that every person has a seat while they are inside the room.

Constraints:
- `1 ≤ len(s) ≤ 10^5`
- The string is well‑formed: at any prefix, the number of `'L'` never exceeds the number of `'E'` (no one leaves before arriving).

## Examples

**Example 1**
```
Input: s = "EELEL"
Output: 2
Explanation: The room occupancy over time is [1,2,1,2,1]; the maximum is 2 chairs.
```

**Example 2**
```
Input: s = "EEEE"
Output: 4
Explanation: All four people stay simultaneously, requiring four chairs.
```

## Approach

**Algorithm:** Single pass counting (running total)

Traverse the string while maintaining:
- `curr` – current number of people inside the room.
- `maxChairs` – maximum value of `curr` seen so far.
Each `'E'` increments `curr`; each `'L'` decrements it. The answer is `maxChairs` after the scan.

```text
FUNCTION minimumChairs(s):
    curr ← 0
    maxChairs ← 0
    FOR c IN s DO
        IF c = 'E' THEN
            curr ← curr + 1
        ELSE
            curr ← curr - 1
        END IF
        IF curr > maxChairs THEN
            maxChairs ← curr
        END IF
    END FOR
    RETURN maxChairs
```

## Walkthrough

| Step | Character | `curr` after step | `maxChairs` |
|------|-----------|-------------------|-------------|
| 1 | E | 1 | 1 |
| 2 | E | 2 | 2 |
| 3 | L | 1 | 2 |
| 4 | E | 2 | 2 |
| 5 | L | 1 | 2 |

The maximum occupancy is 2, so 2 chairs are needed.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(|s|)** – one pass over the string |
| Space  | **O(1)** – only a few integer variables |

## Follow‑Up Questions

1. How would the solution change if the input could contain invalid sequences where a leave occurs before an entry?
2. What if each person stays for a known duration; can we compute the peak occupancy using a sweep‑line?
3. Can we extend the method to handle multiple rooms with separate entry/exit logs?

## Key Takeaway

The minimum number of chairs equals the maximum simultaneous occupancy, which can be obtained by a simple linear scan tracking the running count of people.
