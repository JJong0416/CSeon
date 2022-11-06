package cseon.common.utils;

import cseon.domain.type.CommonType;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

import java.util.EnumSet;

/**
 * {@link CommonType} enum을 String과 상호 변환하는 유틸리티 클래스
 */

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EnumValueConvertUtils {
    public static <T extends Enum<T> & CommonType> T ofStateCode(Class<T> enumClass,
                                                                 Integer stateCode) {
        if (ObjectUtils.isEmpty(stateCode)) {
            return null;
        }

        return EnumSet.allOf(enumClass).stream()
                .filter(v -> v.getStateCode().equals(stateCode))
                .findAny()
                .orElseThrow(() -> new RuntimeException(String.format("enum=[%s], stateCode=[%d]가 존재하지 않습니다.", enumClass.getName(), stateCode)));

    }

    public static <T extends Enum<T> & CommonType> Integer toStateCode(T enumValue) {

        if (enumValue == null) {
            return -1;
        }

        return enumValue.getStateCode();
    }

}
