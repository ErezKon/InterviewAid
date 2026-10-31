# 2029. Stone Game IX

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stone-game-ix](https://leetcode.com/problems/stone-game-ix)
**Companies:** Samsung

---

## Problem Description

Alice and Bob continue their games with stones. There is a row of n stones, and each stone has an associated value. You are given an integer array `stones`, where `stones[i]` is the **value** of the `i^th` stone.

Alice and Bob take turns, with **Alice** starting first. On each turn, the player may remove any stone from `stones`. The player who removes a stone **loses** if the **sum** of the values of **all removed stones** is divisible by `3`. Bob will win automatically if there are no remaining stones (even if it is Alice's turn).

Assuming both players play **optimally**, return `true` *if Alice wins and* `false` *if Bob wins*.

**Constraints:**
- `1 <= stones.length <= 10^5`
- `1 <= stones[i] <= 10^4`

## Examples

**Example 1:**
```
Input: stones = [2,1]
Output: true
Explanation: The game will be played as follows:
- Turn 1: Alice can remove either stone.
- Turn 2: Bob removes the remaining stone.
The sum of the removed stones is 1 + 2 = 3 and is divisible by 3. Therefore, Bob loses and Alice wins the game.
```

**Example 2:**
```
Input: stones = [2]
Output: false
Explanation: Alice will remove the only stone, and the sum of the values on the removed stones is 2.
Since all the stones are removed and the sum of values is not divisible by 3, Bob wins the game.
```

**Example 3:**
```
Input: stones = [5,1,2,4,3]
Output: false
Explanation: Bob will always win. One possible way for Bob to win is shown below:
- Turn 1: Alice can remove the second stone with value 1. Sum of removed stones = 1.
- Turn 2: Bob removes the fifth stone with value 3. Sum of removed stones = 1 + 3 = 4.
- Turn 3: Alices removes the fourth stone with value 4. Sum of removed stones = 1 + 3 + 4 = 8.
- Turn 4: Bob removes the third stone with value 2. Sum of removed stones = 1 + 3 + 4 + 2 = 10.
- Turn 5: Alice removes the first stone with value 5. Sum of removed stones = 1 + 3 + 4 + 2 + 5 = 15.
Alice loses the game because the sum of the removed stones (15) is divisible by 3. Bob wins the game.
```

## Approach
Only values mod 3 matter, so count `c0`, `c1`, `c2` (stones with value mod 3 = 0, 1, 2).

- **Ignoring zeros:** the running sum must never hit 0 mod 3. If Alice starts with a 1, the sum is 1 and the only safe move is another 1 (sum 2), then a 2 (sum 1), then a 1, ... so the forced order is `1, 1, 2, 1, 2, ...`. Symmetrically, starting with a 2 forces `2, 2, 1, 2, 1, ...`. Alice picks the starting class.
- **Zeros:** a 0-stone never changes the sum, so it just passes the turn. Only the parity of `c0` matters (pairs cancel out).

Case analysis (Alice wins iff):
1. `c0` even: zeros cancel. Alice starts with the scarcer non-zero class; Bob is the one who runs out of safe moves as long as both classes exist. Alice wins iff `c1 >= 1 and c2 >= 1`.
2. `c0` odd: one effective turn swap. Alice must start with a class that has at least 3 more stones than the other so that Bob is forced to break the sum before the stones run out (otherwise either she gets stuck or the stones run out, which is a Bob win). Alice wins iff `|c1 - c2| > 2`.

### Pseudocode
```text
FUNCTION stoneGameIX(stones):
    c <- [0, 0, 0]
    FOR v IN stones:
        c[v MOD 3] <- c[v MOD 3] + 1
    IF c[0] MOD 2 == 0:
        RETURN c[1] >= 1 AND c[2] >= 1
    RETURN ABS(c[1] - c[2]) > 2
```

## Walkthrough
**Example 3:** `stones = [5,1,2,4,3]`.
1. Residues mod 3: `[2,1,2,1,0]` -> `c0 = 1`, `c1 = 2`, `c2 = 2`.
2. `c0 = 1` is odd -> check `|c1 - c2| = |2 - 2| = 0 > 2`? No.
3. Return `false` (Bob wins), matching the expected output.

**Example 1:** `stones = [2,1]` -> residues `[2,1]`, `c0 = 0` (even), `c1 = 1`, `c2 = 1` -> both present -> `true`.

**Example 2:** `stones = [2]` -> `c0 = 0` (even), `c1 = 0` -> `false`.

## Complexity Analysis
- **Time:** O(n) - one pass to count residues.
- **Space:** O(1) - three counters.

## Follow-Up Questions
1. How would you verify the case analysis with a memoized brute force over `(c0, c1, c2, sum mod 3, turn)`?
2. How does the answer change if the losing condition were divisibility by 4 instead of 3?
3. What if running out of stones counted as a win for the player who made the last move instead of Bob?

## Key Takeaway
Reducing values mod 3 makes the move sequence forced; with zeros acting as turn passes, the winner depends only on `c0` parity and the counts `c1`, `c2`.
