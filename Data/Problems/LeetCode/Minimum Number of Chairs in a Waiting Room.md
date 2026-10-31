# 3168. Minimum Number of Chairs in a Waiting Room

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-chairs-in-a-waiting-room](https://leetcode.com/problems/minimum-number-of-chairs-in-a-waiting-room)
**Companies:** Amazon, Expedia, Goldman Sachs

---

## Problem Description

You are given a string `s`. Simulate events at each second `i`:

- If `s[i] == 'E'`, a person enters the waiting room and takes one of the chairs in it.
- If `s[i] == 'L'`, a person leaves the waiting room, freeing up a chair.

Return the **minimum **number of chairs needed so that a chair is available for every person who enters the waiting room given that it is initially **empty**.

**Constraints:**
- `1 <= s.length <= 50`
- `s` consists only of the letters `'E'` and `'L'`.
- `s` represents a valid sequence of entries and exits.

## Examples

**Example 1:**
```
Input: s = "EEEEEEE"
Output: 7
Explanation: After each second, a person enters the waiting room and no person leaves it. Therefore, a minimum of 7 chairs is needed.
```

**Example 2:**
```
Input: s = "ELELEEL"
Output: 2
Explanation: Let's consider that there are 2 chairs in the waiting room. The table below shows the state of the waiting room at each second.
  Second
  Event
  People in the Waiting Room
  Available Chairs
  0
  Enter
  1
  1
  1
  Leave
  0
  2
  2
  Enter
  1
  1
  3
  Leave
  0
  2
  4
  Enter
  1
  1
  5
  Enter
  2
  0
  6
  Leave
  1
  1
```

**Example 3:**
```
Input: s = "ELEELEELLL"
Output: 3
Explanation: Let's consider that there are 3 chairs in the waiting room. The table below shows the state of the waiting room at each second.
  Second
  Event
  People in the Waiting Room
  Available Chairs
  0
  Enter
  1
  2
  1
  Leave
  0
  3
  2
  Enter
  1
  2
  3
  Enter
  2
  1
  4
  Leave
  1
  2
  5
  Enter
  2
  1
  6
  Enter
  3
  0
  7
  Leave
  2
  1
  8
  Leave
  1
  2
  9
  Leave
  0
  3
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

## Follow-Up Questions

1. How would the solution change if the input could contain invalid sequences where a leave occurs before an entry?
2. What if each person stays for a known duration; can we compute the peak occupancy using a sweep-line?
3. Can we extend the method to handle multiple rooms with separate entry/exit logs?

## Key Takeaway

The minimum number of chairs equals the maximum simultaneous occupancy, which can be obtained by a simple linear scan tracking the running count of people.
