# 810. Chalkboard XOR Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/chalkboard-xor-game](https://leetcode.com/problems/chalkboard-xor-game)
**Companies:** Garena, Google, Hashedin

---

## Problem Description
Alice and Bob take turns removing any non‑empty subset of numbers from a chalkboard. The XOR of the removed numbers is computed and the remaining numbers stay on the board. The player who makes the XOR of all remaining numbers equal to zero wins. Given the initial array `nums`, determine whether Alice, who moves first, can guarantee a win assuming optimal play.

## Examples
**Example 1:**
```
Input: nums = [1, 1, 2]
Output: true
Explanation: Alice can remove the two 1's, leaving [2] whose XOR is 2 ≠ 0, then Bob removes 2 and loses.
```
**Example 2:**
```
Input: nums = [0]
Output: true
Explanation: XOR is already 0, Alice wins immediately.
```

## Approach
The game reduces to checking two simple conditions:
1. Compute `xorAll` = XOR of all elements.
2. If `xorAll` is 0, the current player wins instantly.
3. Otherwise, if the number of elements is even, Alice can always force a win by mirroring Bob’s moves.

```text
FUNCTION ChalkboardXORGame(nums):
    SET xorAll ← 0
    FOR num IN nums:
        SET xorAll ← xorAll XOR num
    IF xorAll == 0:
        RETURN true
    RETURN (LEN(nums) MOD 2) == 0
```

## Walkthrough
| Step | Remaining nums | xorAll | Decision |
|------|----------------|--------|----------|
| Start | [1,1,2] | 1 XOR 1 XOR 2 = 2 | xorAll ≠ 0, length 3 (odd) → Alice loses if she cannot force even count |
| Alice removes [1,1] | [2] | 2 | xorAll ≠ 0 but length 1 (odd) → Bob forced to remove 2, leaving empty (xor 0) → Alice wins |

## Complexity Analysis
- **Time:** O(n) to compute the XOR of all numbers.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would the solution change if players could only remove a single element per turn?
2. What if the win condition required the XOR to be a specific target value instead of zero?
3. Can this reasoning be extended to a multi‑player variant?

## Key Takeaway
The XOR of the entire array and the parity of its length fully determine the winner in this impartial game.
