package cseon.api.controller;

import cseon.api.dto.response.UserResponseDto;
import cseon.api.service.UserService;
import cseon.common.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse getUser() {
        UserResponseDto userdto = userService.getUser();
        return ApiResponse.success("user", userdto);
    }



}
