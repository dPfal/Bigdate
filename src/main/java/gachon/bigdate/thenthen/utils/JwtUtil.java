package gachon.bigdate.thenthen.utils;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtUtil {
    public static Long getUserIdFromToken(String token, String secretKey) {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("id", Long.class);
    }

    /**
     * 권한 정보가 여러개일 경우..
     * public List<SimpleGrantedAuthority> getAuthoritiesFromToken(String token,String secretKey) {
     * Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
     * String authorities = (String) claims.get("authorities");
     * List<SimpleGrantedAuthority> authorityList = Arrays.stream(authorities.split(","))
     * .map(SimpleGrantedAuthority::new)
     * .collect(Collectors.toList());
     * return authorityList;
     * }
     **/

    public static String getUserRoleFromToken(String token, String secretKey) {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("roles", String.class);
    }

    public static boolean isExpired(String token, String secretKey) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    public static String IssuanceToken(Long Id, String key, String role, long expireTimeMs) {
        Claims claims = Jwts.claims();
        claims.put("id", Id);
        claims.put("roles", role);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTimeMs))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

}
