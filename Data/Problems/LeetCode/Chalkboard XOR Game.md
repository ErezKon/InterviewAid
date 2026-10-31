# 810. Chalkboard XOR Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/chalkboard-xor-game](https://leetcode.com/problems/chalkboard-xor-game)
**Companies:** Garena, Google, Hashedin

---

## Problem Description
You are given an array of integers `nums` represents the numbers written on a chalkboard.

Alice and Bob take turns erasing exactly one number from the chalkboard, with Alice starting first. If erasing a number causes the bitwise XOR of all the elements of the chalkboard to become `0`, then that player loses. The bitwise XOR of one element is that element itself, and the bitwise XOR of no elements is `0`.

Also, if any player starts their turn with the bitwise XOR of all the elements of the chalkboard equal to `0`, then that player wins.

Return `true` *if and only if Alice wins the game, assuming both players play optimally*.

**Constraints:**
- `1 <= nums.length <= 1000`
- `0 <= nums[i] < 2^16`

## Examples
```
Example 1:
  Input: nums = [1,1,2]
  Output: false
  Explanation:
  Alice has two choices: erase 1 or erase 2.
  If she erases 1, the nums array becomes [1, 2]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 2 = 3. Now Bob can remove any element he wants, because Alice will be the one to erase the last element and she will lose.
  If Alice erases 2 first, now nums become [1, 1]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 1 = 0. Alice will lose.
```

```
Example 2:
  Input: nums = [0,1]
  Output: true
```

```
Example 3:
  Input: nums = [1,2,3]
  Output: true
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
3. Can this reasoning be extended to a multi-player variant?

## Key Takeaway
The XOR of the entire array and the parity of its length fully determine the winner in this impartial game.
