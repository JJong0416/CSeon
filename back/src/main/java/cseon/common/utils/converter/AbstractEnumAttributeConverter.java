package cseon.common.utils.converter;

import cseon.common.utils.EnumValueConvertUtils;
import cseon.domain.type.CommonType;
import org.springframework.util.ObjectUtils;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class AbstractEnumAttributeConverter<E extends Enum<E> & CommonType> implements AttributeConverter<E, Integer> {
    /**
     * 대상 Enum 클래스의 {@link Class} 객체
     */
    private Class<E> targetEnumClass;

    /**
     * <code>nullable = false</code> 이면, 변환할 값이 null로 들어왔을 때 예외가 발생
     * <code>nullable = true</code> 이면 변환할 값이 null일 때, 예외 없이 실행하며,
     * 특히 statec Code로 변환시에는 -1로 변환한다.
     */
    private boolean nullable;

    /**
     * <code>nullable = false</code>일 때 출력할 오류 메시지에서 enum에 대한 설명을 위해 Enum의 설명적 이름을 받는다.
     */
    private String enumName;

    @Override
    public Integer convertToDatabaseColumn(E attribute) {
        if (!nullable && attribute == null) {
            throw new IllegalArgumentException(String.format("%s(은)는 NULL로 지정할 수 없습니다.", enumName));
        }
        return EnumValueConvertUtils.toStateCode(attribute);
    }

    @Override
    public E convertToEntityAttribute(Integer dbData) {
        if (!nullable && ObjectUtils.isEmpty(dbData)) {
            throw new IllegalArgumentException(String.format(
                    "%s(이)가 DB에 NULL 혹은 Empty로(%s) 저장되어 있습니다.", enumName, dbData
            ));
        }
        return EnumValueConvertUtils.ofStateCode(targetEnumClass, dbData);
    }
}