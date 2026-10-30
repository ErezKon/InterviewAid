# 838. Push Dominoes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/push-dominoes](https://leetcode.com/problems/push-dominoes)
**Companies:** Amazon, Anduril, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

There are `n` dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.

After each second, each domino that is falling to the left pushes the adjacent domino on the left. Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.

When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.

For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.

You are given a string `dominoes` representing the initial state where:

- `dominoes[i] = 'L'`, if the `i`th domino has been pushed to the left,
- `dominoes[i] = 'R'`, if the `i`th domino has been pushed to the right, and
- `dominoes[i] = '.'`, if the `i`th domino has not been pushed.

Return *a string representing the final state*.

**Constraints:**
- `n == dominoes.length`
- `1 <= n <= 10^5`
- `dominoes[i]` is either `'L'`, `'R'`, or `'.'`.

## Examples

**Example 1:**
```
Input: dominoes = "RR.L"
Output: "RR.L"
Explanation: The first domino expends no additional force on the second domino.
```

**Example 2:**
```
Input: dominoes = ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."
```

## Approach
Treat the string as a line of forces. Pad with a virtual `'L'` at the start and `'R'` at the end to simplify edge handling. Scan the string, and for each segment between two non‑dot characters, fill based on their relative directions:
- Same direction (`L...L` or `R...R`): fill the whole segment with that direction.
- Opposite (`R...L`): fill from both ends moving inward until they meet.
- `L...R`: leave the segment unchanged.

```text
FUNCTION pushDominoes(dominoes):
    SET s ← 'L' + dominoes + 'R'
    SET result ← LIST(s)
    SET i ← 0
    FOR j ← 1 TO LENGTH(s) - 1:
        IF s[j] == '.':
            CONTINUE
        IF s[i] == s[j]:
            // Same direction: fill between i and j
            FOR k ← i + 1 TO j - 1:
                SET result[k] ← s[i]
        ELSE IF s[i] == 'R' AND s[j] == 'L':
            // Colliding forces: fill from both sides
            SET lo ← i + 1
            SET hi ← j - 1
            WHILE lo < hi:
                SET result[lo] ← 'R'
                SET result[hi] ← 'L'
                INCREMENT lo
                DECREMENT hi
            // If lo == hi, middle stays '.'
        // Case L...R does nothing
        SET i ← j
    RETURN JOIN(result[1:-1])
```

## Walkthrough
| Step | i | j | Segment | Action |
|------|---|---|---------|--------|
| 1 | 0 (`L`) | 2 (`R`) | `L.R` | No fill (L...R) |
| 2 | 2 (`R`) | 5 (`L`) | `R...L` | Fill outward: positions 3→`R`, 4→`L` |
| 3 | 5 (`L`) | 9 (`R`) | `L...R` | No fill |
| 4 | 9 (`R`) | 13 (`L`) | `R...L` | Fill positions 10→`R`, 11→`L`; position 12 stays `.` |

## Complexity Analysis
- **Time:** Single pass over the string → O(n).
- **Space:** O(n) for the result array.

## Follow-Up Questions
1. How would you modify the algorithm to handle a continuous stream of pushes rather than a static initial state?
2. Can you compute the final state in place without extra O(n) storage?
3. How would the solution change if pushes could have different strengths?

## Key Takeaway
By converting the problem into intervals between fixed forces and handling each case analytically, we achieve an O(n) solution without explicit simulation of each time step.
