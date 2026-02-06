--========================================================
-- Assets.lua
-- AssetsHome - Auto Assets Loader
--========================================================

local Assets = {}

-- SETTINGS
Assets.Config = {
	AssetsFolderName = "Assets", -- folder name
	TitleName = "AssetsHome", -- site name
}

--========================================================
-- Helpers
--========================================================

local function safeString(s)
	s = tostring(s or "")
	s = s:gsub("\\", "/")
	return s
end

local function getFileNameOnly(file)
	file = safeString(file)
	return file:match("^.+/(.+)$") or file
end

local function guessCategory(name)
	local n = name:lower()

	if n:find("fps") or n:find("hud") or n:find("menu") or n:find("ui") then
		return "ui"
	end
	if n:find("whitelist") or n:find("ban") or n:find("security") then
		return "security"
	end
	if n:find("avatar") or n:find("camera") or n:find("head") then
		return "avatar"
	end
	if n:find("donation") or n:find("economy") or n:find("cash") then
		return "economy"
	end

	return "system"
end

--========================================================
-- MAIN: Scan Assets Folder
--========================================================

function Assets.Scan()
	local list = {}

	-- Lua on website needs LuaFileSystem (lfs)
	local ok, lfs = pcall(require, "lfs")
	if not ok then
		return {
			ok = false,
			error = "LuaFileSystem (lfs) not found. This Assets.lua is for Lua server apps."
		}
	end

	local folder = Assets.Config.AssetsFolderName

	for file in lfs.dir(folder) do
		if file ~= "." and file ~= ".." then
			local fullPath = folder .. "/" .. file

			local attr = lfs.attributes(fullPath)
			if attr and attr.mode == "file" then
				table.insert(list, {
					name = file,
					file = "/Assets/" .. file,
					category = guessCategory(file),
					size = attr.size or 0,
					modified = attr.modification or 0
				})
			end
		end
	end

	table.sort(list, function(a, b)
		return a.name:lower() < b.name:lower()
	end)

	return {
		ok = true,
		title = Assets.Config.TitleName,
		count = #list,
		assets = list
	}
end

return Assets
