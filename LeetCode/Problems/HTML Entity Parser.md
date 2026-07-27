# 1410. HTML Entity Parser

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/html-entity-parser](https://leetcode.com/problems/html-entity-parser)
**Companies:** Amazon, Google, Oracle

---

```
FUNCTION entityParser(text):
    entities = {
        "&quot;": '"', "&apos;": "'", "&amp;": "&",
        "&gt;": ">", "&lt;": "<", "&frasl;": "/"
    }
    FOR entity, char IN entities.items():
        text = text.replace(entity, char)
    RETURN text
```
