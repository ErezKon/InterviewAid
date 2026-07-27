# 423. Reconstruct Original Digits from English

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reconstruct-original-digits-from-english](https://leetcode.com/problems/reconstruct-original-digits-from-english)
**Companies:** Google, Kickdrum, Netapp, Wix

---

```
FUNCTION originalDigits(s):
    count = Counter(s)
    out = [0] * 10
    // Unique letters identify certain digits
    out[0] = count['z']        // zero
    out[2] = count['w']        // two
    out[4] = count['u']        // four
    out[6] = count['x']        // six
    out[8] = count['g']        // eight
    out[3] = count['h'] - out[8]    // three
    out[5] = count['f'] - out[4]    // five
    out[7] = count['s'] - out[6]    // seven
    out[1] = count['o'] - out[0] - out[2] - out[4]
    out[9] = count['i'] - out[5] - out[6] - out[8]

    RETURN JOIN(str(i) * out[i] for i in range(10))
```
